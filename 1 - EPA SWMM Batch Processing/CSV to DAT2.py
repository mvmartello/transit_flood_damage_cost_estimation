#michael, change the Root.inp to whatever basic INP file you want to be the basis for
import csv 
import os.path
import shutil, os
# https://stackoverflow.com/questions/8024248/telling-python-to-save-a-txt-file-to-a-certain-directory-on-windows-and-mac/8024254
rootfile = 'Root.inp' #name of inp file you want to be your basis 
for x in range(21):
    hmax = 'hmax' + str(x+1) 
    folders = hmax #name of folder
    root_path = 'E:/Documents/Academic Files/Graduate - MIT/1.THG - Research/MBTA Cost Estimation/Tunnel Flood Model/UROP Work 2020_05_20'  #change path here. 
    os.mkdir(os.path.join(root_path,folders))
    newpath  = os.path.join(root_path, folders)         
    shutil.copy('Root.inp', newpath) #NAME OF THE ORIGINAL INP file you wish to create 
    os.chdir(newpath) #goes into directory of the new folder you made and we change the name of that file to hmax something .inp 
    newname = ('hmax' + str(x+1) +'.inp')
    
    os.rename('Root.inp', newname) #change Root.inp to name of original INP file 
    os.chdir(root_path) #goes back to original directory 
    print(newpath)
    
    


    # a = open(completeName, "w")    
    rows = []
    name = []
    position = []
    time = []
    date = []
    filename = "D" + str(x+1) + ".csv"
    with open(filename, 'r') as file: #named the main CSV file data This is the file that you want to manipulate 
        reader = csv.reader(file)
        
        for x in reader:
            if x != []: 
                rows.append(x) #gets rid of that weird spacing between rows 
        #print(rows)
        
        #Extract the top row of data (i.e., Time; junction numbers...)
        toprow = rows[0]
        #Set the rest of that aside in a new variable called data
        data = rows[1:]
        #Create a finaldata variable to store the array of data less the time steps
        finaldata = []
        #For each row of the data
        for row in data:
            #Take all but the first 2 rows (i.e., the date and time steps) and add it to finaldata
            finaldata.append(row[2:])
            #Save the first 2 rows (i.e., the date and time steps) for use later
            date.append(row[0])
            time.append(row[1])
        # print(finaldata)       # without the time 
        # print(time)
        #Now, for each row of finaldata
        for row in finaldata:
            #For each item in the row,
            for x in row: 
                #If the value is not 0, and the corresponding toprow index (i.e., x + 1) is not in the position list
                if x != '0' and  row.index(x) + 1 not in position : 
                    #Append the toprow index to the position list
                    position.append(row.index(x)+1)
                    
       # print(position)
       # print(finaldata)
       
       #For each index in the position list,
        for x in position:
            #Get the corresponding junction from the toprow list
            name = "junction" + str(toprow[x+1])
            # print (name)
            #Create a new .DAT file for that junction number
            completeName = os.path.join(newpath, name+".dat")         
            #print (completeName)
            #Open the newly created .DAT file
            a = open( completeName  ,"w+")
            #For each row in finaldata
            for y in range(len(time)-1):
                #print(x-1)
                #Append the time step and inflow volume associated with the junction
                string = (date[y] + " " + time[y] + " " + str(finaldata[y][x-1]))
                a.write(string + "\n")
                
             

        #a.close()

