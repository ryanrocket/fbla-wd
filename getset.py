# GetSet.py - Get Recent Commits And Apply Them!
# Ryan Wans

import time         # to manage waits
import subprocess   # to execute git commands

global ratio    
ratio = 60 #in seconds

def get():  
    # get commit (pull)
    command = "git pull origin master"        # pull from repo
    process = subprocess.Popen(command.split(), stdout=subprocess.PIPE)  # execute as bash
    output, error = process.communicate()   # get output if fatal (anyways)
    return [True];

def node():
    # apply new changes 
    command = "node server.js"        # restart nodejs process
    process = subprocess.Popen(command.split(), stdout=subprocess.PIPE)  # execute as bash
    output, error = process.communicate()   # get output if fatal (anyways)
    return [True];


def run():
    while(1):
        get()
        set()
        time.sleep(ratio)
        continue 

run();