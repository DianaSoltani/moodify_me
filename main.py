
# Import Flask module to create a web server
from flask import Flask, render_template, request, session, redirect, g, url_for
import os
# Import the database
import pymongo
import secret



# logs onto mongodb's database, we are using the atlas client DO NOT USE MY PASSWORD PLEASE
dbclient = pymongo.MongoClient(secret.secret_key)
db = dbclient.profiles
# Our current file is represented as '__name__'. So we want
# Flask to use this file to create the web application.
app = Flask(__name__)
app.secret_key = os.urandom(24)
# Routing for the default page
@app.route("/", methods=['GET', 'POST'])
def login():

    if request.method == 'POST':        
        session.pop('user', None)
        if request.form['password'] == 'password':
            session['user'] = request.form['username']
            return redirect(url_for('homepage'))

    return render_template("login.html")

@app.route('/homepage')
def homepage():
    if g.user:
        return render_template('home.html')
    return redirect(url_for('login'))

@app.route('/register')
def register():
    return render_template("register.html")

@app.before_request
def before_request():
    g.user = None
    if 'user' in session:
        g.user = session['user']


@app.route('/getsession')
def getsession():
    if 'user' in session:
        return session['user']
    return 'Not logged in!'

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

    
    

