#!/usr/bin/env python

import rospy
from std_msgs.msg import String

user = {
	'name' : "username",
	'life' : 100,
	'robotN' : 2
}

rospy.set_param('users', user)

string = rospy.get_param('users')

print(string)