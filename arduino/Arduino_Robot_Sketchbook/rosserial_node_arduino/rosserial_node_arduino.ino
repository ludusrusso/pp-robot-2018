#include <AccelStepper.h>
#include <ros.h>
#include <std_msgs/Empty.h>
#include <laser_bot_battle/Robot_msg.h>

// Steps the motor has to perform at each Robot_msg received
#define STEPS_PER_MOVEMENT_FW 16
#define STEPS_PER_MOVEMENT_BW -16
#define STEPS_PER_MOVEMENT_CW 16
#define STEPS_PER_MOVEMENT_CCW -16
// Default constant speed
#define STEPPER_SPEED 100

// ROS Node
ros::NodeHandle  nh;

// Messages exchanged 
laser_bot_battle::Robot_msg robot_msg;      // Msg containing commands for the robot (move + fire)  
std_msgs::Empty hit;                        // Msg to notify the robot has been hit

// The Robot publishes a response to notify if it has been hit or not
ros::Publisher pub("response", &robot_msg);
// The Robot receive a Robot_msg and actuate the stepper motor and/or to the infrared driver.
ros::Subscriber<laser_bot_battle::Robot_msg> sub("command", &robot_cb);

AccelStepper stepper_l(AccelStepper::HALF4WIRE, 8, 10, 9, 11);
// To define pin numbers for second motor
AccelStepper stepper_r(AccelStepper::HALF4WIRE, 8, 10, 9, 11);

//CallBack function to manage a received msg
void robot_cb( const laser_bot_battle::Robot_msg& cmd_msg){    
  
  nh.loginfo("Cmd Received"); 

  // Storing the incoming command
  robot_msg.linear_x = cmd_msg.linear_x;
  robot_msg.angular_z = cmd_msg.angular_z;
  robot_msg.shoot = cmd_msg.shoot;

  // Linear movement has priority over Angular one
  switch(robot_msg.linear_x){
    case  1 :
      // Move Forward
      stepper_l.move(STEPS_PER_MOVEMENT_FW);
      stepper_r.move(STEPS_PER_MOVEMENT_FW);
      break;
    case -1 :
      // Move Backward
      stepper_l.move(STEPS_PER_MOVEMENT_BW);
      stepper_r.move(STEPS_PER_MOVEMENT_BW);
      break;          
  }   

  if(robot_msg.linear_x == 0){
    switch(robot_msg.angular_z){
      case  1 :
        // Move Clockwise
        stepper_l.move(STEPS_PER_MOVEMENT_CW);
        stepper_r.move(STEPS_PER_MOVEMENT_CCW);
        break;
      case -1 :
        // Move Counter Clockwise
        stepper_l.move(STEPS_PER_MOVEMENT_CCW);
        stepper_r.move(STEPS_PER_MOVEMENT_CW);
        break;
      default :
        // Stop the robot if both linear_x and angular_z = 0
        stepper_l.stop();
    }
  }
  
  //pub.publish(&robot_msg); 
}

void setup(){
  stepper_l.setMaxSpeed(STEPPER_SPEED);
  //stepper_l.moveTo(0);

  stepper_r.setMaxSpeed(STEPPER_SPEED);
  //stepper_r.moveTo(0);
  
  pinMode(13, OUTPUT);
  
  nh.initNode();
  nh.advertise(pub);
  nh.subscribe(sub);
}

void loop(){
  //pub.publish(&speed_msg);
  nh.spinOnce();
  // Set speed to constant speed
  stepper_l.setSpeed(STEPPER_SPEED);
  stepper_r.setSpeed(STEPPER_SPEED);
  // Move the motor until the target position previously by move is reached (1 step per iteration)
  stepper_l.runSpeedToPosition();
  stepper_r.runSpeedToPosition();
  // The delay should be consistent with the rate of incoming Robot_msgs (greater)
  //delay(50);
}
