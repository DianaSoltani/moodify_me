# Import Flask module to create a web server
from flask import Flask, request, session, g, jsonify
import os
import hashlib
# Import the database
from pymongo import MongoClient
from flask_socketio import SocketIO, emit, join_room, leave_room
import secret

# Our current file is represented as "__name__". So we want
# Flask to use this file to create the web application.
app = Flask(__name__)
app.secret_key = os.urandom(24)
socketio = SocketIO(app)

# logs onto mongodb"s database, we are using the atlas client
dbclient = MongoClient(secret.secret_key)
db = dbclient.profiles


# Routing for the default page
@app.route("/login", methods=["POST"])
def login():
    # invalidates their old session
    session.pop("user", None)
    username = request.get_json()["username"]
    password = request.get_json()["password"]
    # sees if their password matches the intended password
    # first get the user from the database
    user = db.user.find_one({"username": username})
    if user is None:
        return jsonify(message="Invalid username/password"), 409

    hashed_pwd = str(hashlib.sha256(password.encode("utf-8")).hexdigest())
    user_pwd = user["password"]

    if hashed_pwd == user_pwd:
        session["user"] = username
        # it does so redirect them to the homepage
        return jsonify({"username": username})
    # password was incorrect
    return jsonify(message="Invalid username/password"), 401


# the homepage of our project
@app.route("/home")
def homepage():
    # ensures the user had a session in order to get to the page
    if g.user:
        return jsonify({"username": g.user})
    # otherwise sends them back to the login page
    return jsonify(message="Not logged in"), 403


# page used to register the user
@app.route("/register", methods=["POST"])
def register():
    # invalidates their old session
    session.pop("user", None)
    username = request.get_json()["username"]
    # saves the item into the database and transforms the password using sha256 for security
    password = hashlib.sha256(request.get_json()["password"].encode("utf-8")).hexdigest()
    user = db.user.find_one({"username": username})
    if user is None:
        db.user.insert_one({"username": username, "password": password, "rooms": []})
        emit("new_user", {"username": username})
        return jsonify({"username": username})
    # the username is already in the database, dont read it
    return jsonify(message="Username already taken"), 409

# if the user is in session, gives g.user said session
@app.before_request
def before_request():
    g.user = None
    if "user" in session:
        g.user = session["user"]

# drops a users session and shows "Dropped"
@app.route("/logout", methods=["GET"])
def logout():
    session.pop("user", None)
    return jsonify(message="Logged out")


@app.route("/get_users", methods=["GET"])
def get_users():
    users = db.user.find(projection={"_id": False, "password": False})
    usernames = []
    for user in list(users):
        usernames.append(user["username"])
    return jsonify({"users": usernames})

@app.route("/<username>/get_rooms", methods=["GET"])
def get_user_rooms(username):
    user_data = db.user.find(filter={"username": username}, projection={"_id": False, "rooms": True})[0]
    room_names = [room for room in user_data["rooms"]]
    rooms = db.rooms.find(projection={"_id": False})
    rooms = filter(lambda room: room["roomName"] in room_names, rooms)
    return jsonify({"rooms": list(rooms)})


@socketio.on("connect")
def handle_connect():
    if "user" in session:
        username = session["user"]
        print("%s has come online" % username)
        emit("connect", {"username": username})
    else:
        return False


@socketio.on("disconnect")
def handle_disconnect():
    print("%s has gone offline" % session["user"])


@socketio.on("new_message")
def handle_message(data):
    message = data["message"]
    room = data["room"]
    db.rooms.update_one(filter={"roomName": room}, update={"$push": {"messages": message}})
    emit("new_message", {"messageData": data}, room=room)


@socketio.on("join")
def handle_join(data):
    username = data["username"]
    room = data["room"]
    join_room(room)
    emit("room_opened", {"roomName": room}, broadcast=True)
    if data["is_first_join"]:
        db.rooms.update_one(filter={"roomName": room}, update={"$setOnInsert": {"messages": []}}, upsert=True)
        db.user.update_one(filter={"username": username}, update={"$addToSet": {"rooms": room}})
        for user in room.split(" "):
            db.user.update_one(filter={"username": user}, update={"$addToSet": {"rooms": room}})


# This will run the application
if __name__ == "__main__":
    socketio.run(app, debug=True)
