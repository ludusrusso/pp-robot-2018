#!/usr/bin/env python

import sys
import rospy
from custom_srv.srv import *

def add_new_robot_client():
    rospy.wait_for_service('add_new_robot')
    try:
    	new_robot = rospy.ServiceProxy('add_new_robot', AddNewRobot)
    	robot_ID = new_robot()
    	print ("New robot ID = %d"%robot_ID.ID)
    except rospy.ServiceException, e:
    	print "Service call failed: %s"%e
	
if __name__ == "__main__":
	add_new_robot_client()

