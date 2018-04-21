import json
#from app import gameStarted

HITDAMAGE = 1


def userDefault(obj):
    if isinstance(obj, set):
        return list(obj)
    return obj.__dict__

# User class
class User:
    name = ""
    life = 100
    robot = 0
    ready = 0

    def __init__(self, name, robot, life=None, ready=None):
        self.name = name
        self.robot = robot
        if life == None :
            self.life = 100
        else :
            self.life = life
        if ready == None :
            self.ready = False
        else :
            self.ready = ready

# list of users class
class Users:
    users = []

    # add new user to list
    def addUser(self, name, robot, life=None):
        self.users.append( User(name, robot, life) )
        self.users.sort(key=lambda x: x.life) 

    # delete user from list
    def delUser(self, name):
        for u in self.users:
            if u.name == name :
                self.users.remove(u)
                return True
        return False

    # check if user with a given username is already in list
    def isNameAvailable(self, name):
        for u in self.users:
            if u.name == name :
                return False
        return True

    # return json string of users list
    def toString(self):
        return json.dumps(self.users, default=userDefault)

    # return num of users list
    def usersNum(self):
        num = 0
        for u in self.users:
            if u.name == "" :
                return -1
            num += 1
        return num

    # set ready status of player
    def setReady(self, name, ready):
        for u in self.users:
            if u.name == name :
                u.ready = int(ready)
                return True
        return False

    #
    def hit(self, name):
        #print self.toString()
        from app import gameStarted
        if gameStarted == 2:
		    for u in self.users :
		        #print "u.name", u.name, " name", name, "."
		        if u.name == name :
		            print "User", name, "has been hit. LIFE:", int(u.life-HITDAMAGE)
		            u.life -= HITDAMAGE
		            if u.life < 0 :
		                u.life = 0
		            return True
        return False

users = Users()
