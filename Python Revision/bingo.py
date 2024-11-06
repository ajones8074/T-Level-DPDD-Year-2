import random

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
            called = callNumber(called)
            print(f"Number: {called[-1]}")
        elif option == 2:
            checkNumbers(called)
        elif option == 3:
            reset(called)
        elif option == 4:
            break


def callNumber(called):
   while True:
        match = False
        num = random.randint(1,90)
        for item in called:
           if item == num:
               match = True
        if match == False:
           called.append(num)
           return called
        

def checkNumbers(called):
    if len(called) >= 1:
        called.sort()
        print(called)
        print(f"Last number called: {called[-1]}")
        print(f"{len(called)} number(s) called")
    else:
        print("No numbers have been called. Choose option 1 to call a number")

def reset(called):
    print("Option 3 - reset")
    del called[:]

main()
