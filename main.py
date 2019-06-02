
# Import Flask module to create a web server
from flask import Flask, render_template

# Import the database
import pymongo
# Our current file is represented as '__name__'. So we want
# Flask to use this file to create the web application.
app = Flask(__name__)

# Routing for the default page
@app.route("/")
def home():
    return render_template("home.html")

# This will run the application.
# Set debug=True to have Python errors to appear on the page to trace errors.
if __name__ == "__main__":

    #Some basic database stuff
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient["Moods"]
    print(myclient.list_database_names())
    dblist = myclient.list_database_names()
    mycol = mydb["Person1"]
    mydict = { "name": "John", "currentState" : "Happy"}
    x = mycol.insert_one(mydict)
    y = mycol.find({}, {"name": "John"})
    print(y)


    app.run(debug = True)
    
    

