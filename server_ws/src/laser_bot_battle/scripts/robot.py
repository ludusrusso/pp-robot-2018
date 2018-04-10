import json

def userDefault(obj):
    if isinstance(obj, set):
        return list(obj)
    return obj.__dict__

# Robot class
class Robot:
    ID = 0
    user = ""

    def __init__(self, id, user=None):
        self.ID = id
	if user != None :
        	self.user = user


# list of robots class
class Robots:
    robots = []

    # add new robot to list (and keep it sorted by ID)
    def addRobot(self, id):
        self.robots.append( Robot(id) )
        self.robots.sort(key=lambda x: x.ID) 
	print("Added robot with ID", id)


    # get first available robot (ID) from robots list
    def getAvailableRobot(self):
        for r in self.robots:
	    print "id: ", r.ID , "user: ", r.user
            if r.user == "" :
                return r.ID
        return -1

    # get number of available robots
    def getAvailableRobotsN(self):
        num = 0
        for r in self.robots:
	    #print "id: ", r.ID , "user: ", r.user
            if r.user == "" :
                num += 1
        return num

    # get first unused ID starting from 0
    def getAvailableID(self):
        ID = 0
        for r in self.robots:
            if r.ID == ID :
                ID += 1
            else :
                break
        return ID

    # associate user name to robot
    def addUserToRobot(self, id, name):
        for r in self.robots:
            if r.ID == id and r.user == "" :
                r.user = name
                return True
        return False

    # de-associate user from robot
    def removeUserFromRobot(self, name):
        for r in self.robots:
            if r.user == name :
                r.user = ""
                return True
        return False

    # delete robot from list
    def delRobot(self, id):
        for r in self.robots:
            if r.ID == id :
                self.robots.remove(r)
                return True
        return False

    # return json string of users list
    def toString(self):
        return json.dumps(self.robots, default=userDefault)

robots = Robots()
