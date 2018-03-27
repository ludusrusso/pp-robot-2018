#!/usr/bin/env python

from custom_srv.srv import *
import rospy

Robot_ID = 0

def handle_new_robot(req):
	global Robot_ID
	print "Request received from robot"
	Robot_ID += 1
	# The Robot ID is returned to the robot requiring it
	return AddNewRobotResponse(Robot_ID)

def add_new_robot_server():
    rospy.init_node('robots_server')
    s = rospy.Service('add_new_robot', AddNewRobot , handle_new_robot)
    print "Ready to add a new robot!"
    rospy.spin()

if __name__ == "__main__":
    add_new_robot_server()
