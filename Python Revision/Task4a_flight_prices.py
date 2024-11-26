import pandas as pd
import matplotlib.pyplot as plt


# displays main menu and collects users choice 
def main_menu():
    flag = True

    while flag:
        print("#######################################################")
        print("########            Choose an option           ########")
        print("####            1. Compare Prices                  ####")
        print("####            2. Most Popular Destinations       ####")
        print("####            3. Commision Earned                ####")
        print("####            4. Quit Program                    ####")
        print("#######################################################")

        menu_choice = input("Please enter the number of the option (1-4): ")

        try:
            int(menu_choice)
        except:
            print("Sorry you did not enter a valid choice")
            flag = True
        else:
            if int(menu_choice) < 1 or int(menu_choice) > 4:
                print("Sorry, your choice was not in range")
                flag = True
            else:
                if int(menu_choice) == 1:
                    comparePrices()
                elif int(menu_choice) == 2:
                    popular_destinations()
                elif int(menu_choice) == 3:
                    commission()
                elif int(menu_choice) == 4:
                    print("\nQutting program... \n\n")
                    break



#displays menu and collects user choice of destination
def destination_menu():

    flag = True

    while flag:
        print("######################################################")
        print("########         Choose a destination          ########")
        print("Alicante (ALC)")
        print("Amsterdam (AMS)")
        print("Athens (ATH)")
        print("Budapest (BUD)")
        print("Cologne (CGN)")
        print("Dublin (DUB)")
        print("Munich (MUC)")
        print("Paris (CDG)")
        print("Rhodes (RHO)")
        print("######################################################")

        #collects and validates user input to ensure choice is in the list
        #converts the collected code to full name

        menu_choice = input("Please enter the three letter destination code: ").upper()

        code_list = ["ALC","AMS", "ATH", "BUD", "CGN" ,"DUB", "MUC", "CDG","RHO"]
        airport_list = ["Alicante" ,"Amsterdam", "Athens", "Budapest","Cologne","Dublin","Munich","Paris","Rhodes"]
        
        if menu_choice in code_list:
            airport_postion = code_list.index(menu_choice)
            return airport_list[airport_postion]
        else:
            print("Sorry, you did not enter a valid three letter code")
            flag = True

#collects the month that the user wishes to travel and validates input
def get_date():

    flag = True

    while flag:
        print("######################################################")
        print("When will you be traveling?")
        print("Please enter the number of the month you will be travelling (1-12)")
        print("for example June = 6")
        print("######################################################")

        month_list = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"]

        month_choice = input("Please enter the number of your choice (1-12): ")

        try:
            int(month_choice)
        except:
            print("Sorry, you did not enter a valid choice")
            flag = True
        else:
            if int(month_choice) < 1 or int(month_choice) > 12:
                print("Sorry, you did not neter a valid choice")
                flag = True
            else:
                travel_date = month_list[int(month_choice)-1]
                return travel_date  
        
# Compare Prices
def comparePrices():
    destination = destination_menu()
    month = get_date()
    extracted_data = get_data(month, destination) 
    extract_no_index = extracted_data.to_string(index=False)
    print(extract_no_index)
    compare_data(extracted_data, month, destination)

#gets the main list of data that matches user search criteia and displays it
def get_data(month, destination):
    df = pd.read_csv("Task4a_data.csv")
    extract = df.loc[(df['Month'] == month) & (df['Destination'] == destination), df.columns != "Commission (%)"]
    print("We have found these flights that match your criteria:")
    return extract


#extracts more meaningful data from the results for comparison
def compare_data(extracted_data, destination, month):
    
    compare_df = extracted_data[['Airline', 'Price']]
   
    column = compare_df['Price']
    max_price = column.max()
    min_price = column.min()
    
    most_expensive = compare_df.loc[(extracted_data['Price']== max_price)]
    least_expensive = compare_df.loc[(extracted_data['Price']== min_price)]
    
    average_price = round(compare_df['Price'].mean(),2)
    
   
    print("###############################################")
    print("The most expensive flights to {} in {} are: ".format(destination, month) )
    print(most_expensive.to_string(index=False))
    print("")
    print("The least expensive flights to {} in {} are: ".format(destination, month) )
    print(least_expensive.to_string(index=False))
    print("")
    print("The average price of a flight to {} in {} is: ".format(destination, month))
    print(average_price)
    print("###############################################")

def popular_destinations():

    df = pd.read_csv('Task4a_data.csv')
    month = get_date()
    selct = df['Month'] == month
    
    destDf = df.loc[selct]['Destination'].value_counts()
    print(destDf)

    destDf.plot.bar()
    plt.show()

def commission():

    df = pd.read_csv('Task4a_data.csv')
    month = get_date()
    slct = df['Month'] == month

    # calculate commission earned
    df['commissionEarned'] = df['Price'] * df['Commission (%)']/100
    totalEarned = df[slct].groupby('Airline')['commissionEarned'].sum()

    print(f"Total commission earned in GBP per airline: \n{totalEarned}")

    totalEarned.plot.bar()
    plt.title("Total commission earned in GBP per airline")
    plt.show()


main_menu()