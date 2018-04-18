#!/usr/bin/env python
from flask import Flask, render_template, request, json
from users import userDefault, users
from robot import robots
#from ID_service_server import add_new_robot_server
import ID_service_server
import threading
import time

app = Flask(__name__, static_folder='static', static_url_path='/static')

timeLeft = 0
gameStarted = 0

# Index Login Page
@app.route('/')
def index():
	return render_template('index.html')

# User home page
@app.route('/home')
def home():
	return render_template('home.html')

# Project about page
@app.route('/about')
def about():
	return render_template('about.html')

# dont' cache data
@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r


# ----- FUNCTIONS --------------------------------------------------------------

# signUpUser function:
#   add user to user list if name is available
@app.route('/signUpUser', methods=['POST'])
def signUpUser():
    name = request.form['data']

    # if username is availabe :
    if users.isNameAvailable(name) :

        # check first available robot id
        robotN = robots.getAvailableRobot();
        if robotN == -1 :
            return json.dumps({'status':'NO_ROBOTS', 'user':name})

        # associate user to robot (check if fail)
        if not robots.addUserToRobot(robotN, name) :
            return json.dumps({'status':'ROBOT_UNAVAILABLE', 'robot':robotN})

        # add it to users list
    	users.addUser(name, robotN, 100)
    	return json.dumps({'status':'OK', 'user':name, 'robot':robotN})

    else :
        # else return UNAVAILABLE error
	    return json.dumps({'status':'UNAVAILABLE', 'user':name})


# signOutUser function:
#   delete user from user list if present
@app.route('/signOutUser', methods=['POST'])
def signOutUser():
    name = request.form['data']

    # if user is in users list :
    if not users.isNameAvailable(name) :

        robots.removeUserFromRobot(name)

        # delete from list
        if users.delUser(name) :
            return json.dumps({'status':'OK', 'user':name})
        else :
            return json.dumps({'status':'FAILED', 'user':name})
    else :
        # else return UNREGISTERED error
        return json.dumps({'status':'UNREGISTERED', 'user':name})


# listUsers function:
#   return list of logged in users (json format)
@app.route('/listUsers', methods=['POST'])
def listUsers():    
    return json.dumps({'status':'OK', 'users':users.toString()}, default=userDefault)


# getAvailableRobots function:
#   return number of available robots (json format)
@app.route('/getAvailableRobots', methods=['POST'])
def getAvailableRobots():  
    #print robots.toString()  
    #print "num robots : ", robots.getAvailableRobotsN()
    return json.dumps({'status':'OK', 'availableR':robots.getAvailableRobotsN()})


# countdown function
def countdown():
    global timeLeft
    global gameStarted
    print "countdown started"
    while timeLeft >= 0:
        time.sleep(1)
        timeLeft -= 1
        print timeLeft,

    print('Starting game!')
    gameStarted = 2
    return


# waitCountdown function:
#   launch countdown if game not started, else return countdown status
@app.route('/waitCountdown', methods=['POST'])
def waitCountdown():
    global gameStarted
    global timeLeft
    if gameStarted == 0 and users.usersNum() > 1: 
        gameStarted = 1
        timeLeft = 30
        threadCountDown = threading.Thread(target=countdown)
        tHreadCountDown.start()
    elif gameStarted == 1 :
        return json.dumps({'status':'OK', 'timeLeft':timeLeft})
    else :
        return json.dumps({'status':'STARTED'})


# playerReady function:
#   update player ready status
@app.route('/playerReady', methods=['POST'])
def playerReady():
    name = request.form['user']
    ready = request.form['ready']

    print "ready", ready

    if gameStarted == 2 :
        return json.dumps({'status':'STARTED'})

    if users.setReady(name, ready) :
        return json.dumps({'status':'OK','user':name})
    else :
        return json.dumps({'status':'ERROR','user':name})


# Inc alive value for robot that call this function
@app.route('/incAlive', methods=['POST'])
def incAlive():
    robotID = request.form['ID']

    if robotID != "":
        robots.isAlive(robotID)

# Check if all connected robots are still alive
def checkAlive():
    while True:
        robotList = robots.returnRobotList();
        # For each robot check if isalive
        for r in robotList:
            #print "Checking robot ", r.ID, " alive is ", r.alive
            if r.alive == 0 :
                 # If not delete robot and user
                print "Robot ", r.ID, " is dead. Player ", r.user, " disconnected"
                users.delUser(r.user)
                robots.delRobot(r.ID)
            else:
                r.alive = 0 

        time.sleep(2)

    return


# Main function
def main():
    threadAlive = threading.Thread(target=checkAlive)
    threadAlive.start()
    app.run(debug=False, use_reloader = False, host='0.0.0.0')

# -----------------------------------------------------------------------------

if __name__ == '__main__':
    main()


