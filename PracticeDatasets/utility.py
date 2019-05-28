import os
import pandas as pd
import json
import numpy as np

#Utility program for converting json datasets into csv files
data = []
with open('input/Sarcasm_Headlines_Dataset.json', encoding="utf8") as data_file:
     for line in data_file:
        data.append(json.loads(line))

dataframe = pd.DataFrame(data)
## Saving the dataframe to a csv file
dataframe.to_csv("input/Sarcasm_Headlines_Dataset.csv", encoding='utf-8', index=False)