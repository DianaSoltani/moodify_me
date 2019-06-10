
# Import Flask module to create a web server
from flask import Flask, render_template, request, session, redirect, g, url_for
import os
# Import the database
import pymongo
import secret



# logs onto mongodb's database, we are using the atlas client 
dbclient = pymongo.MongoClient(secret.secret_key)
db = dbclient.profiles
# Our current file is represented as '__name__'. So we want
# Flask to use this file to create the web application.
app = Flask(__name__)
app.secret_key = os.urandom(24)
# Routing for the default page
@app.route("/", methods=['GET', 'POST'])
def login():
    #sees if the user made a POST request
    if request.method == 'POST':   
        #invalidates their old session     
        session.pop('user', None)
        #sees if their password matches the intended password
        if request.form['password'] == 'password':
            session['user'] = request.form['username']
            #it does so redirect them to the homepage
            return redirect(url_for('homepage'))
    #password was either incorrect or nothing happened
    return render_template("login.html")

#the homepage of our project
@app.route('/homepage')
def homepage():
    #ensures the user had a session in order to get to the page
    if g.user:
        return render_template('home.html')
    #otherwise sends them back to the login page
    return redirect(url_for('login'))

#page used to register the user
@app.route('/register')
def register():
    return render_template("register.html")

#if the user is in session, gives g.user said session
@app.before_request
def before_request():
    g.user = None
    if 'user' in session:
        g.user = session['user']

#gets a users session, otherwise shows "Not logged in" if there is no session
@app.route('/getsession')
def getsession():
    if 'user' in session:
        return session['user']
    return 'Not logged in!'

#drops a users session and shows "Dropped"
@app.route('/dropsession')
def dropsesison():
    session.pop('user', None)
    return 'Dropped!'

# This will run the application.
# Set debug=True to have Python errors to appear on the page to trace errors.
if __name__ == "__main__":

    #Some basic database stuff
    db.user.insert_one({"id" : 1, "name": "Bob"})
    app.run(debug = True)

    
    

