#!/usr/bin/env python

import sys
import os
import rospy
import subprocess
from laser_bot_battle.srv import *

def add_new_robot_client():
	# Wait until the service is not activated in ID_service_server.py
	rospy.wait_for_service('add_new_robot')
	try:
		if os.path.isfile("/dev/ttyACM0"):
			device = "/dev/ttyACM0"
		elif os.path.isfile("/dev/ttyUSB0"):
			device = "/dev/ttyUSB0"
		else :
			print "No attached ARDUINO found"
			return

		new_robot = rospy.ServiceProxy('add_new_robot', AddNewRobot)
		# new_robot() makes the request to the server and the returned ID is saved
		robot_ID = new_robot()
		print ("New robot ID = %d"%robot_ID.ID)
		# The command to generate the ros node with unique name and topics is composed here
		command = 'rosrun rosserial_python serial_node.py ' + str(device) + ' __name:=Robot' + str(robot_ID.ID)
		command += ' command:=Robot' + str(robot_ID.ID) + '/command'
		command += ' response:=Robot' + str(robot_ID.ID) + '/response'
		command += ' alive:=Robot' + str(robot_ID.ID) + '/alive'

		print "Running client application:\n", command
		output = subprocess.check_call(command, shell=True)

	except rospy.ServiceException, e:
		print "Service call failed: %s"%e

if __name__ == "__main__":
	add_new_robot_client()


