
import csv
import os.path
import shutil, os



root_path = 'E:/Documents/Academic Files/Graduate - MIT/1.THG - Research/MBTA Cost Estimation/Tunnel Flood Model/UROP Work 2020_05_20/Reports' #name of the folder of the report folder change accordingly
os.chdir(root_path)
for x in range(36): 
    list = []
    dictionary = []
    filename = "report" + str(x+1) + ".txt"
    
    with open(filename, 'r') as file:
        reader = csv.reader(file, delimiter = '\t')
        count = 0 
        for row in reader:
            dictionary.append(row)
    
    
    if ['                                 Average  Maximum  Maximum  Time of Max    Reported'] in dictionary: 
        dog1= dictionary.index(['                                 Average  Maximum  Maximum  Time of Max    Reported']) 
   
        dog2= dictionary.index(['  Node Inflow Summary'])# list1 = ['1', '2', '3
       
        for d in range(dog1+4, dog2-3):
          # print(dictionary[x])  
          str1= ''.join(dictionary[d]) 
          list.append(str1.split())
        
        csvname = "Report" +str(x+1) +".csv"
      
        with open(csvname, 'w') as file: #name of the file you want to create will parse through how many hmax values you have and create hmax1 hmax2 files in the directory you run this code in. 
            writer = csv.writer(file)
            writer.writerow(["Node", "Type", "Average Depth Feet", "Maximum Depth Feet", "Maximum HGL Feet", "Time of Max Occurence days", "hr:min"," Reported Max Depth Feet"])
            for x in list: 
                writer.writerow(x)
                

        
        