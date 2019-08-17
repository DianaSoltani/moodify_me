# Import Flask module to create a web server
from flask import Flask, request, jsonify
import os
# Import the database
from pymongo import MongoClient
from flask_socketio import SocketIO, emit, join_room, leave_room
from flask_login import LoginManager, login_user, current_user, logout_user, login_required
from argon2 import PasswordHasher
import secret

# Our current file is represented as "__name__". So we want
# Flask to use this file to create the web application.
app = Flask(__name__)
app.secret_key = os.urandom(24)
login_manager = LoginManager()
login_manager.init_app(app)
pwd_hasher = PasswordHasher(
    memory_cost=262144,
    time_cost=3,
    parallelism=4,
)
socketio = SocketIO(app)

# logs onto mongodb"s database, we are using the atlas client
dbclient = MongoClient(secret.secret_key)
db = dbclient.profiles


@login_manager.user_loader
def load_user(username):
    user = db.user.find_one({"username": username})
    return None if user is None else User(username)


@login_manager.unauthorized_handler
def handle_unauthorized():
    # otherwise sends back a response with error code 403 so the user can login
    return jsonify(message="Not logged in"), 403


# end point for user login
@app.route("/login", methods=["POST"])
def login():
    # fetches the username and password passed in through the request body
    username = request.get_json()["username"]
    password = request.get_json()["password"]
    # sees if their password matches the intended password
    # first get the user from the database
    user = db.user.find_one({"username": username})
    # if a user with the given username is not found or if the password given is incorrect
    # from the one stored in the database, response with error code 401 is returned
    if user is None or not User.verify_password(user["password"], password):
        return jsonify(message="Invalid username/password"), 401

    # otherwise, the user is authenticated so first a User object is created
    user_instance = User(user["username"])
    # next, this user object is passed to login_user for session persistence
    login_user(user_instance)
    # next, if the password stored needs to be updated (possibly due to password
    # hashing parameters changing), the password is hashed and updated in the database
    if pwd_hasher.check_needs_rehash(user["password"]):
        db.user.update_one(filter={"username": username}, update={"$set": {"password": pwd_hasher.hash(password)}})

    # finally, successful login is communicated by sending back the username and 200 response code
    return jsonify({"username": username})


# end point for user's home page
@app.route("/home")
@login_required
def homepage():
    return jsonify({"username": current_user.username})


# end point for user registration
@app.route("/register", methods=["POST"])
def register():
    # first the username is extracted from the request body
    username = request.get_json()["username"]
    # next, verification is performed to make sure a user with the same username
    # doesn't already exist in the database
    user = db.user.find_one({"username": username})
    # if such a user already exists, registration failure is indicated
    if user is not None:
        return jsonify(message="Username already taken"), 409
    # since this is a new and unique user, first the hashed password is calculated
    password = pwd_hasher.hash(request.get_json()["password"])
    db.user.insert_one({"username": username, "password": password, "rooms": []})
    socketio.emit("new_user", {"username": username})
    return jsonify({"username": username})


# end point for logging out a user
@app.route("/logout", methods=["GET"])
def logout():
    logout_user()
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
    if current_user.is_authenticated:
        username = current_user.username
        print("%s has come online" % username)
        emit("connect", {"username": username})
    else:
        return False


@socketio.on("disconnect")
def handle_disconnect():
    print("%s has gone offline" % current_user.username)


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
    from user import User
    socketio.run(app, debug=True)
