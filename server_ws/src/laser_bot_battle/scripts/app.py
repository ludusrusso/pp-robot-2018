#!/usr/bin/env python
from flask import Flask, render_template, request, json
from users import userDefault, users
from robot import robots
import ID_service_server
import threading
import time


timeLeft = 0
gameStarted = int(0)

app = Flask(__name__, static_folder='static', static_url_path='/static')

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
        robotN = robots.getAvailableRobot()
        if robotN == -1 :
            return json.dumps({'status':'NO_ROBOTS', 'user':name})

        # associate user to robot (check if fail)
        if not robots.addUserToRobot(robotN, name) :
            return json.dumps({'status':'ROBOT_UNAVAILABLE', 'robot':robotN})

        # add it to users list
        users.addUser(name, robotN)
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


# updateGameStatus function:
#   return list of logged in users, game status and time to begin (json format)
@app.route('/updateGameStatus', methods=['POST'])
def updateGameStatus():
    return json.dumps({'status':'OK', 'users':users.toString(),
     'game': gameStarted, 'timeLeft':timeLeft}, default=userDefault)


# getAvailableRobots function:
#   return number of available robots (json format)
@app.route('/getAvailableRobots', methods=['POST'])
def getAvailableRobots():
    return json.dumps({'status':'OK', 'availableR':robots.getAvailableRobotsN()})


# gameStatus function:
#   start countdown, start game and check end of game
def gameStatus():
    global timeLeft
    global gameStarted
    gameStarted = 1
    print "countdown started"

    # countdown to game start
    while timeLeft > 0:
        time.sleep(1)
        timeLeft -= 1
        print timeLeft,

        print "Starting game!"
        gameStarted = 2

    # check for game to end (only 1 player alive)
    while users.getUsersAlive() > 1 :
        #print "users alive:", users.getUsersAlive() 
        users.usersSort()
        time.sleep(0.5)

    # game finished
    print "Game finished"
    gameStarted = 0
    users.clearUsersReady()

    return


# playerReady function:
#   update player ready status
@app.route('/playerReady', methods=['POST'])
def playerReady():
    global timeLeft
    global gameStarted
    name = request.form['user']
    ready = request.form['ready']
    print "name:", name, ".ready:", ready,"."

    # Game already started
    if gameStarted == 2 :
        return json.dumps({'status':'STARTED'})

    #set user ready
    if users.setReady(name, ready) :
        # If more than 2 players are ready
        if users.getUsersReady() > 1 :
            users.resetUsersLife()
            timeLeft = 15
            # Launch countdown to game start as a new thread
            threadGameStatus = threading.Thread(target=gameStatus)
            threadGameStatus.start()

            return json.dumps({'status':'OK','user':name})
        else :
            return json.dumps({'status':'ERROR','user':name})


# incAlive function:
#   increase alive value for robot that call this function
@app.route('/incAlive', methods=['POST'])
def incAlive():
    robotID = int(request.form['ID'])

    if robotID != "":
        if robots.isAlive(robotID):
            return json.dumps({'status':'OK'})

    return json.dumps({'status':'ERROR'})


# checkAlive function:
#   check every 2 sec if all connected robots are still alive, if not delete them
def checkAlive():
    while True:
        #print "ClearAlive"
        robots.clearAlive()
        time.sleep(2)


# main function:
def main():
    threadAlive = threading.Thread(target=checkAlive)
    # Launch checkAlive function as a separate thread
    threadAlive.start()

    # Run flask web app
    app.run(debug=False, use_reloader = False, host='0.0.0.0')

# -----------------------------------------------------------------------------

if __name__ == '__main__':
    main()
