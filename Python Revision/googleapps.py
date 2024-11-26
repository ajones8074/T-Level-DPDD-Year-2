import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("googleplaystore.csv")

#print(df.info())

#print(df)
#print(df.columns)

# print(df.shape)
pd.set_option('display.max_rows', df.shape[0])
# print(df.loc[:,['App','Installs']])

# graphdf = df['Category'].value_counts()
# graphdf.plot.bar()
# plt.show()

select = (df['Category'] == 'BUSINESS') & (df['Type'] == 'Paid')
# print(df[select])
print(df.loc[select, 'App'])
