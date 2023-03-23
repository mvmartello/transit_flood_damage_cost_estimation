import os
from pprint import pprint
# for x in range(36)
with open("run.bat", 'w') as file_handler:
    dog =("@echo off")    
    doggo = "pause"
    file_handler.writelines(dog)
    for x in range(20):
            hmax = "hmax" + str(x+1) #just the name here, Also make sure you change the Users Eric Desktop to whatever directory you want.
            eric = (r'swmm5 "E:/Documents/Academic Files/Graduate - MIT/1.THG - Research/MBTA Cost Estimation/Tunnel Flood Model/UROP Work 2020_05_20' + '/' +  hmax + '/' + hmax + '.inp"' + ' "E:/Documents/Academic Files/Graduate - MIT/1.THG - Research/MBTA Cost Estimation/Tunnel Flood Model/UROP Work 2020_05_20/report' + str(x+1) + '.txt"') #MAKE SURE YOU RUN THIS WITHIN THE SAME swmm5 EPA also the same hmax junction folders you generated folders through the CSV to DAT and EDITING INP files 
            # hmax20\hmax_20.inp txt.txt"
            
            file_handler.writelines("\n" + eric)
        
    file_handler.writelines("\n" + doggo)