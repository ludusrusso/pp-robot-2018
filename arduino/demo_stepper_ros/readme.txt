This is a simple sketch implementing a pub-sub node.

To be better defined the motor variables, according with used motor characteristics

This version should not gives connection problems as far as publishing rates does not 
excedes 50Hz

SUB:	on "stepper speed" topic
		The master will send on this topic the intended speed
		The CB function will read this speed and will set the motor speed accordingly 
		Future development of this function will include the full motor parameter set
			(speed, intended steps, go-stop, ecc...)


PUB:	on "speed_log" topic
		For now it just echo the received speed
		Future development of this function will include a feedback for the master,
			this ack-like method will allows to find possible connection problems 