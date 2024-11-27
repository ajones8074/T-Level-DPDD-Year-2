import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("Task4a_data.csv")

# prints data about the columns
print(df.info())

# prints column names in an array
print(df.columns)

# prints number of rows and columns
print(df.shape)

# prints all rows, not just first and last 5 as default 
pd.set_option('display.max_rows', df.shape[0])
print(df)

# prints each value from column specified and how many times it appears
graphdf = df['Destination'].value_counts()
print(graphdf)

# displays a bar chart
graphdf.plot.bar()
plt.show()

# create a filter to select data for Alicante and JetWay
select = (df['Destination'] == 'Alicante') & (df['Airline'] == 'JetWay')

# print data within the filter
# .loc is required to print all data
# if .loc is not used, each row of data is displayed as true or false
print(df.loc[select])