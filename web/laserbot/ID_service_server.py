#!/usr/bin/env python

from laser_bot_battle.srv import *
import rospy
from robot import Robots, robots

def handle_new_robot(req):
	print "Request received from robot"
	Robot_ID = robots.getAvailableID()

	robots.addRobot(Robot_ID)
	# The Robot ID is returned to the robot requiring it
	return AddNewRobotResponse(Robot_ID)

def add_new_robot_server():
    rospy.init_node('robots_server')
	# The service add_new_robot is created and up to now can be required by a client
    s = rospy.Service('add_new_robot', AddNewRobot , handle_new_robot)
    print "Ready to add a new robot!"
    rospy.spin()

if __name__ == "__main__":
    add_new_robot_server()