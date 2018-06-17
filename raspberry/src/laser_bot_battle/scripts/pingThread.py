#!/usr/bin/env python

import threading
import requests



class pingThread(threading.Thread):

    def __init__(self, id, name='pingThread'):
        """ constructor, setting initial variables """
        self._ID = id;
        self._stopevent = threading.Event()
        self._sleepperiod = 0.4
        threading.Thread.__init__(self, name=name)

    def run(self):
        """ main control loop """
        print "%s starts" % (self.getName(),)

        payload={'ID': self._ID}
        headers={}
        url='http://laser_bot_master.local:5000/incAlive'
        #url='http://localhost:5000/incAlive'
        
        while not self._stopevent.isSet():

            # Send POST request with ID data
            r = requests.post(url, data=payload, headers=headers)
            # Sleep
            self._stopevent.wait(self._sleepperiod)

        print "%s ends" % (self.getName(),)

    def join(self, timeout=None):
        """ Stop the thread and wait for it to end. """
        self._stopevent.set()
        threading.Thread.join(self, timeout)
