// STEPPER CONFIGURATION
#include <Stepper.h>
#include <ros.h>
#include <std_msgs/Int16.h>

/*-----( Declare Constants, Pin Numbers )-----*/
//---( Number of steps per revolution of INTERNAL motor in 4-step mode )---
#define STEPS_PER_MOTOR_REVOLUTION 32   
//---( Steps per OUTPUT SHAFT of gear reduction )---
#define STEPS_PER_OUTPUT_REVOLUTION 32 * 64  //2048  

//The pin connections need to be pins 8,9,10,11 connected
// to Motor Driver In1, In2, In3, In4 

// Then the pins are entered here in the sequence 1-3-2-4 for proper sequencing

ros::NodeHandle nh;

// callback function for the arduino subscriber
void motor_run_Cb( const std_msgs::Int16& motor_speed){
  
  Stepper small_stepper(STEPS_PER_MOTOR_REVOLUTION, 8, 10, 9, 11);
  int  Steps2Take;
  Steps2Take  =  - STEPS_PER_OUTPUT_REVOLUTION ;  // Rotate CCW 1/2 turn  
  small_stepper.setSpeed(1000);  // 700 a good max speed??
  small_stepper.step(Steps2Take);
}

// set the arduino subscriber
ros::Subscriber<std_msgs::Int16> sub("motor_speed_topic", &motor_run_Cb );

void setup()
{
  nh.initNode();
  nh.subscribe(sub);
}

void loop()
{
  // In order to wait once for a message on the topic
  nh.spinOnce();

}

