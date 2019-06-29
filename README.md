# moodify_me
Moodify is a web application messaging platform that has the added extra benefit as serving as a mini game between users. The game involves users sending messages like normal except they have to send a hidden emoji after it that represents what they are feeling. The other user then has to guess the emoji to correctly match their feeling. If they guess right they get 100 points, if they guess wrong they lose 25. Points are stored on a per group chat/direct message basis. The hopes is that in the future all of this could be used towards a machine learning algorithm that can use the data from these interactions to be trained and find out the emotions a user is feeling when they send a certain message. 

The link to the live website is here: *INSERT LINK HERE*

#### Goals
*- Initialize web application with a restful api using MongoDB atlas.*

*- Basic registering function to have authenticated users.*

- Create messaging system to allow back and forth messages between users. Connect it to a link.

- Integrate emojis into messages (if not already integrated). Begin making website more presentable for final product and finish connecting link if necessary.

- Begin finishing up website design if not already finished.

- Begin creating game, first create button to enable game mode per direct message/group basis

- Be able to recognize who won the game on a basic level (with a single emoji)

- Expand to multiple basic emojis and implement point system

#### Potential Future Ideas

Use the system created and data gained from this application in order to build a machine learning algorithm that can determine a users emotion and react to users messages with their exact emotions. 

### Setup

In order to begin to setup our program first ensure you have a Python version 3.7 or higher installed on your machine.

* Begin by cloning the repository into a desired directory.

* Once cloned we must begin to install the required dependancies, download flask and pymongo (either through pip or through some IDE installer)

* Next we must setup the pymongo server to load data into
   * create a mongodb atlas account here: https://www.mongodb.com/cloud/atlas
   * create a cluster under any name you wish
   * whitelist your IP and download some sort of client in order to access the database by following the connect instructions (compass is recommended)
   * take the connection link given by mongodb and concatnate "?retryWrites=true" to the end of it and fill in the part with <password> in the link with connection account password you created
   * take the concatnated link and put it into the location marked "here" in line 9 of main.py in the root directory of the program:
      dbclient = pymongo.MongoClient('here') or alternatively put it into the string in secret.py and it will be used for you
 
* Finally, in the moodify-ui/app folder run npm install to install all of the requirements necessary for the react side of the program

Once all of that is done, simply run start.py if you are on a windows machine, otherwise open up two terminals and run npm start in the moodify-ui/app folder and main.py in the server folder on seperate terminals

#### Some recommended data sets to work with (not necessarily S.A. Practice)
https://www.kaggle.com/nltkdata/movie-review

https://www.kaggle.com/petersunga/google-amazon-facebook-employee-reviews

https://www.kaggle.com/jiashenliu/515k-hotel-reviews-data-in-europe

## Learning Center and Notes
##### Courtesy of developers.google.com
What is (supervised) machine learning? Machine Learning systems learn how to combine input to produce useful predictions on never-before-seen data.

##### Terminology
* Labels: the thing we're predicting - the y variable in simple linear regression.
* Features: the input variable - the x variable in simple linear regression. 
* Examples: a particular piece of data that can be labeled or unlabeled. 

A labeled example includes both features and the label {features, label} : (x,y)

Labeled examples are used to train the model (marking features with a label). Example of this can be marking emails as spam or not spam.

An unlabeled example contains features but not the label. {features, ?} : (x,y)

* Models: defines the relationship between features and label. 
    * Training: creating or learning the model. You would show modeled labeled examples to gradually learn the relationships between features and label.
    * Inference: applying the trained model to unlabeled examples. This is where you have the model make useful predictions to define the label.
* Regression vs Classification
    * Regression: a regression model predicts continuous values. 
        * What is the value of a house in California?
        * What is the probability that a user will click on this ad?
    * Classification: this type of model predicts discrete values. This answers the following:
        * Is a given email message spam or not spam?
        * Is this an image of a dog, a cat, or a hamster?
* Linear Regression: a method for finding the straight line or hyperplane that best fits a set of points.   



#### Learning Resources

https://towardsdatascience.com/train-validation-and-test-sets-72cb40cba9e7

https://developers.google.com/machine-learning/crash-course/training-and-test-sets/splitting-data
