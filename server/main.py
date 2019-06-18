# Import Flask module to create a web server
from flask import Flask, render_template, request, session, redirect, g, url_for, jsonify
import os
import hashlib
# Import the database
from flask_pymongo import PyMongo
from server import secret

# Our current file is represented as "__name__". So we want
# Flask to use this file to create the web application.
app = Flask(__name__)
app.secret_key = os.urandom(24)

# logs onto mongodb"s database, we are using the atlas client
dbclient = PyMongo(app, uri=secret.secret_key)
db = dbclient.db.profiles


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
    if (user is None):
        return jsonify(message="Invalid username/password"), 409

    hashed_pwd = str(hashlib.sha256(password.encode("utf-8")).hexdigest())
    user_pwd = user["password"]

    if hashed_pwd == user_pwd:
        session["user"] = username
        # it does so redirect them to the homepage
        return jsonify(message="Logged in")
    # password was incorrect
    return jsonify(message="Invalid username/password"), 401


# the homepage of our project
@app.route("/home")
def homepage():
    # ensures the user had a session in order to get to the page
    if g.user:
        return jsonify(message="Homepage")
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
        db.user.insert_one({"username": username, "password": password})
        return jsonify(message="Registered user successfully")
    # the usernames already in the database, dont readd it
    return jsonify(message="Username already taken"), 409


# if the user is in session, gives g.user said session
@app.before_request
def before_request():
    g.user = None
    if "user" in session:
        g.user = session["user"]


# gets a users session, otherwise shows "Not logged in" if there is no session
@app.route("/getsession")
def getsession():
    if "user" in session:
        return session["user"]
    return "Not logged in!"


# drops a users session and shows "Dropped"
@app.route("/dropsession")
def dropsesison():
    session.pop("user", None)
    return "Dropped!"


# This will run the application.
# Set debug=True to have Python errors to appear on the page to trace errors.
if __name__ == "__main__":
    app.run(debug=True)
