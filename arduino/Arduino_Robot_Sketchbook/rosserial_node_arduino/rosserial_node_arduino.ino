#include <AccelStepper.h>
#include <ros.h>
#include <std_msgs/Empty.h>
#include <laser_bot_battle/Robot_msg.h>

// NB : The time to complete these steps should be consistent with the rate of incoming Robot_msgs (greater)
// Steps the motor has to perform at each Robot_msg received
#define STEPS_PER_MOVEMENT_CW 320
#define STEPS_PER_MOVEMENT_CCW -320
// Scale factor used when robot turns l/r 
#define SPEED_SCALER 0.7
// Default constant speed
#define STEPPER_SPEED 1024

// ROS Node
ros::NodeHandle  nh;

// Messages exchanged 
laser_bot_battle::Robot_msg robot_msg;      // Msg containing commands for the robot (move + fire)  
std_msgs::Empty hit;                        // Msg to notify the robot has been hit

// The Robot publishes a response to notify if it has been hit or not
ros::Publisher pub("response", &hit);

// Stepper motor instances
AccelStepper stepper_l(AccelStepper::HALF4WIRE, 8, 10, 9, 11);
// To define pin numbers for second motor
AccelStepper stepper_r(AccelStepper::HALF4WIRE, 2, 3, 4, 5);

//CallBack function to manage a received msg
void robot_cb( const laser_bot_battle::Robot_msg& cmd_msg){    

  short step_l = 0;
  short step_r = 0;

  switch(cmd_msg.linear_x){
    case  1 :
      // Move Forward
      step_l = STEPS_PER_MOVEMENT_CCW;
      step_r = STEPS_PER_MOVEMENT_CW;
      break;
    case -1 :
      // Move Backward
      step_l = STEPS_PER_MOVEMENT_CW;
      step_r = STEPS_PER_MOVEMENT_CCW;
      break;
    default :          
      break;
  }   

  if(cmd_msg.linear_x == 0){
    // Here if turning around l/r or stopping
    switch(robot_msg.angular_z){
      case  1 :
        // Turn around Clockwise
        step_l = STEPS_PER_MOVEMENT_CCW;
        step_r = STEPS_PER_MOVEMENT_CCW;
        break;
      case -1 :
        // Turn around Counter Clockwise
        step_l = STEPS_PER_MOVEMENT_CW;
        step_r = STEPS_PER_MOVEMENT_CW;
        break;
      default :          
        break;
      /*
      default :
        // Stop the robot if both linear_x and angular_z = 0
        stepper_l.stop();
        stepper_r.stop();
      */
    }
  }else {
     // Here if moving straight + turning r/l or stopping
     switch(cmd_msg.angular_z){
      case  1 :
        // Move straight + turn right
        step_r = step_r * 0.7;
        break;
      case -1 :
        // Move straight + turn left
        step_l = step_l * 0.7;
        break;
      default :          
        break;
     }
  }

  // Relative movement of the motor from current position by step_l/step_r
  stepper_l.move(step_l);
  stepper_r.move(step_r);
  
  //pub.publish(&robot_msg); 
}

// The Robot receive a Robot_msg and actuate the stepper motor and/or to the infrared driver.
ros::Subscriber<laser_bot_battle::Robot_msg> sub("command", &robot_cb);

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
}
