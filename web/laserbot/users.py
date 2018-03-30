import json

def jdefault(obj):
    if isinstance(obj, set):
        return list(obj)
    return obj.__dict__

class User:
    name = ""
    life = 100
    robot = 0

    def __init__(self, name, robot=None, life=None):
        self.name = name
        self.robot = robot
        if life == None :
            self.life = 100
        else :
            self.life = life

class Users:
    users = []

    def addUser(self, name, life=None, robot=None):
        self.users.append(User(name, life, robot))

    def delUser(self, name):
        for u in self.users:
            if u.name == name :
                self.users.remove(u)
                return

    def isNameAvailable(self, name):
        for u in self.users:
            if u.name == name :
                return False
        return True

    def toString(self):
        return json.dumps(self.users, default=jdefault)
