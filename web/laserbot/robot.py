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
        self.user = user


# list of robots class
class Robots:
    robots = []

    # add new robot to list (and keep it sorted by ID)
    def addRobot(self, id):
        self.robots.append( Robot(id) )
        self.sort(key=lambda x: x.ID) 


    # get first available robot (ID) from robots list
    def getAvailableRobot(self):
        for r in self.robots:
            if r.name == "" :
                return r.ID
        return False

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

    # delete robot from list
    def delUser(self, id):
        for r in self.robots:
            if r.ID == id :
                self.robots.remove(r)
                return True
        return False

robots = Robots()
