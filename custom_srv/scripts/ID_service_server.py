#!/usr/bin/env python

from custom_srv.srv import *
import rospy

def handle_new_robot(req):
    print "Received request"
    return AddNewRobotResponse(1)

def add_new_robot_server():
    rospy.init_node('new_robot_server')
    s = rospy.Service('add_new_robot',AddNewRobot , handle_new_robot)
    print "Ready to add new robot."
    rospy.spin()

if __name__ == "__main__":
    add_new_robot_server()
