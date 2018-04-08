#include <Stepper.h>
#include <ros.h>
#include <std_msgs/Empty.h>
#include <laser_bot_battle/Robot_msg.h>

/*-----( Declare Constants, Pin Numbers )-----*/
//---( Number of steps per revolution of INTERNAL motor in 4-step mode )---
#define STEPS_PER_MOTOR_REVOLUTION 32   

//---( Steps per OUTPUT SHAFT of gear reduction )---
#define STEPS_PER_OUTPUT_REVOLUTION 32 * 64  //2048 

// ROS Node
ros::NodeHandle  nh;

laser_bot_battle::Robot_msg robot_msg;      // Msg containing commands for the robot (move + fire)  
std_msgs::Empty hit;                        // Msg to notify the robot has been hit

ros::Publisher pub("response", &robot_msg);

Stepper small_stepper(STEPS_PER_MOTOR_REVOLUTION, 8, 10, 9, 11);

//CallBack function to a received msg
void stepper_cb( const laser_bot_battle::Robot_msg& cmd_msg){
  
  digitalWrite(13, HIGH-digitalRead(13));   // blink the led
  int Steps2Take  =  10; 
  
  //nh.loginfo("received speed"); 
  
  robot_msg.linear_x = cmd_msg.linear_x;
  pub.publish(&robot_msg);
  //small_stepper.setSpeed(cmd_msg.data);
  //small_stepper.step(Steps2Take); 
}

ros::Subscriber<laser_bot_battle::Robot_msg> sub("command", &stepper_cb);

void setup(){
  pinMode(13, OUTPUT);
  nh.initNode();
  nh.advertise(pub);
  nh.subscribe(sub);
  }

void loop(){
  //pub.publish(&speed_msg);
  nh.spinOnce();
  delay(50);
}
