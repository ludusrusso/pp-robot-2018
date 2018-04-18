#!/usr/bin/env python

from robot import Robots, robots

print "Adding robot"
Robot_ID = robots.getAvailableID()

print "ID:", Robot_ID

robots.addRobot(Robot_ID)