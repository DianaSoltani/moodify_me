#Setup with data

#For linear algebra purposes
import numpy as np
#For data processing, CSV file input/output
import pandas as pd
#Mathematical plotting tool
import matplotlib.pyplot as plot
#Visualization tool
import seaborn

import os
#import json, csv, sys

#Print all input data files that are available in the "input" directory
print(os.listdir('input'))

#Use pandas to read csv file
data = pd.read_csv('input/Sarcasm_Headlines_Dataset.csv')

#Dump all of the column information for the .csv file
data.info()

#
data.corr()

f,ax = plot.subplots(figsize = (18,18))
seaborn.heatmap(data.corr(), annot=True, linewidths=.5, fmt= '.1f', ax=ax)
plot.show()

data.head(10)


data.headline.plot()
