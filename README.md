# moodify_me
Moodify is a web application messaging platform that allows users to send messages to each other with expressive emojis attached at the end of the message. These emojis are carefully picked through a machine learning algorithm that quantifies each text message. Each text message will be categorized into a specific "mood" which corresponds to that emoji. 

The link to the live website is here: *INSERT LINK HERE*

Currently, no advancements will be made towards making this into an android application or extending the the algorithm outside of the web application since this is a summer term project. However, this application will likely be hosted on a live server.

####Timeline
June 7th: Initialize Web Application and Texting Platform

June 14th: Integrate emojis in messages and make sure that live messaging works

June 23th: Train labeled data from application messages into 6 basic categories: happiness, sadness, disgust, fear, surprise, and anger.

June 30th: Full basic functionality of application

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

#### Some recommended data sets to work with (not necessarily S.A. Practice)
https://www.kaggle.com/nltkdata/movie-review

https://www.kaggle.com/petersunga/google-amazon-facebook-employee-reviews

https://www.kaggle.com/jiashenliu/515k-hotel-reviews-data-in-europe


#### Learning Resources

https://towardsdatascience.com/train-validation-and-test-sets-72cb40cba9e7

https://developers.google.com/machine-learning/crash-course/training-and-test-sets/splitting-data