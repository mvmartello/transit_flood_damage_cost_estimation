# -*- coding: utf-8 -*-
"""
Created on Sun May  2 09:57:16 2021

@author: Eric
"""

import os
from pprint import pprint



root_path = 'E:/Documents/Academic Files/Graduate - MIT/1.THG - Research/MBTA Cost Estimation/Tunnel Flood Model/UROP Work 2020_05_20'#name of whatever this python file is in typically have it outside of the hmax foldiers created in the CSV to DAT.py file
#For each scenario of interest
for x in range(20):
    #Get the name for the input file
    filename = "hmax" + str(x+1)
    #Get the path for the input file
    newpath  = os.path.join(root_path, filename)
    #Get the list of all files in the scenario folder
    arr = os.listdir(newpath)
    os.chdir(newpath)
    #print(os.getcwd())
    # for i in arr: 
    #     if "hmax" not in i:
    #         print(i)
    print(newpath)
    
    #Create the input file nae
    inpname = "hmax" + str(x+1) +".inp"
    
    #Open the input file
    with open(inpname, 'r') as file_handler:
        #Read the lines of the input file
        lines = file_handler.readlines()
    
    count = 0 
    #For each time sereies file in the folder
    for i in arr: 
        #Get the locations of the time series and inflow data within the inputs file        
        timeseriesindex = lines.index(";;-------------- ---------- ---------- ----------\n")
        inflowindex= lines.index("[INFLOWS]\n")
        #If the file of interest isn't the input file
        if "hmax" not in i:
            #And if there's only one digit after the word "junction" in the file name
            if len(i) > 10 and i[9] == ".":
                #Pull the number from the file name
                number = i[8:9]
            #Else, if there are 3 digits after the word "junction" in the file name
            elif len(i) > 10 and i[11] == ".":
                #Pull the number from the file name
                number = i[8:11]
            #Otherwise, there should only be 2 digits after the word "junction" in the file name
            else:
                #Pull the number from the file name
                number = i[8:10]
                
            #3 rows down from the inflow index marker, add in the flow data in the correct format for SWMM
            lines.insert(inflowindex + 3, number + "               FLOW             " + i +  "    FLOW     1.0      1.0              \n")
            #Similarly, 2 rows down from the time series index marker, indent in preparation to add the time series info
            lines.insert(timeseriesindex + 2 + count, ";" + "\n")\
            #Add the time series info in the correct format for SWMM
            lines.insert(timeseriesindex + 2 + count, i + "  " + "FILE" + "   \""+ newpath + "/" +  i + "\"\n" )
            
    #pprint(lines)
   #Save changes to file
    with open(inpname, 'w') as file_handler:
        file_handler.writelines(lines)