# moodify_me
Sentimental Analysis Practice

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