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

    def __init__(self, name, robot):
        self.name = name
        self.robot = robot
        self.life = 100
        self.ready = 0


# list of users class
class Users:
    users = []

    # add new user to list
    def addUser(self, name, robot):
        self.users.append( User(name, robot) )

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

    # get number of players ready to start
    def getUsersReady(self):
        num = 0
        for u in self.users:
            if u.ready != 0 :
                num += 1
        return num

    # get number of players still alive
    def getUsersAlive(self):
        num = 0
        for u in self.users:
            if u.life > 0 and u.ready == 1 :
                num += 1
        return num

    # clear all players ready status
    def clearUsersReady(self):
        for u in self.users:
            u.ready = 0

    # set (reset) all players life to 100
    def resetUsersLife(self):
        for u in self.users:
            u.life = 100

    # reduce user life when hit
    def hit(self, name):
        #print self.toString()
        from app import gameStarted
        if gameStarted == 2:
            for u in self.users :
                #print "u.name", u.name, " name", name, "."
                if u.name == name :
                    u.life -= HITDAMAGE
                    if u.life < 0 :
                        u.life = 0
                    print "User", name, "has been hit. LIFE:", u.life
                    return True
        return False

    # sort key for sorting users by life (if ready)
    def __sortKey(self,x):
        if x.ready == 1:
            return x.life
        return 101
        
    # sort userlist
    def usersSort(self):
        self.users.sort(key=self.__sortKey, reverse=True) 

users = Users()
