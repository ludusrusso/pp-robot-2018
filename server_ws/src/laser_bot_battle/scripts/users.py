import json

def userDefault(obj):
    if isinstance(obj, set):
        return list(obj)
    return obj.__dict__

# User class
class User:
    name = ""
    life = 100
    robot = 0

    def __init__(self, name, robot, life=None):
        self.name = name
        self.robot = robot
        if life == None :
            self.life = 100
        else :
            self.life = life

# list of users class
class Users:
    users = []

    # add new user to list
    def addUser(self, name, robot, life=None):
        self.users.append( User(name, robot, life) )

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

users = Users()