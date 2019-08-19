# Import Flask module to create a web server
from flask import Flask, render_template

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
        app.run(debug=True)

