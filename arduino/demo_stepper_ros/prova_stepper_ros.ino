#include <Stepper.h>
#include <ros.h>
#include <std_msgs/UInt16.h>

/*-----( Declare Constants, Pin Numbers )-----*/
//---( Number of steps per revolution of INTERNAL motor in 4-step mode )---
#define STEPS_PER_MOTOR_REVOLUTION 32   

//---( Steps per OUTPUT SHAFT of gear reduction )---
#define STEPS_PER_OUTPUT_REVOLUTION 32 * 64  //2048 

// ROS Node
ros::NodeHandle  nh;

std_msgs::UInt16 speed_msg;
ros::Publisher pub("speed_log", &speed_msg);

Stepper small_stepper(STEPS_PER_MOTOR_REVOLUTION, 8, 10, 9, 11);

//CallBack function to a received msg
void stepper_cb( const std_msgs::UInt16& cmd_msg){
  
  digitalWrite(13, HIGH-digitalRead(13));   // blink the led
  int Steps2Take  =  10; 
  
  //nh.loginfo("received speed"); 
  
  speed_msg.data = cmd_msg.data;
  pub.publish(&speed_msg);
  small_stepper.setSpeed(cmd_msg.data);
  small_stepper.step(Steps2Take); 
}

ros::Subscriber<std_msgs::UInt16> sub("stepper_speed", &stepper_cb);

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
