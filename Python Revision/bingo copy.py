import random

# numsCalled = []
# num = random.randint(1,90)
# numsCalled.append(num)

# for nums in numsCalled:
#     if num == nums:
#         pass


# print(num)

def main():
    called = []
    while True:
        print("******************************")
        print("*       1. Call number       *")
        print("*       2. Check numbers     *")
        print("*       3. Reset             *")
        print("*       4. Quit              *")
        print("******************************")
        try:
            option = int(input("Enter your choice (1-4): "))
            if option < 1 or option > 4:
                print("ERROR - Enter a valid input from 1 to 4!")
        except:
            option = 0
            print("ERROR - Enter a valid integer!")
        if option == 1:
            callNumbers(called)
        elif option == 2:
            checkNumbers(called)
        elif option == 3:
            reset()
        elif option == 4:
            break


def callNumbers(called):
   while True:
        match = False
        num = random.randint(1,90)
        for item in called:
           if item == num:
               match == True
        if match == False:
           called.append(num)
           return called
        

def checkNumbers(called):
    print("Option 2 - check numbers")
    print(called)

def reset():
    print("Option 3 - reset")

main()