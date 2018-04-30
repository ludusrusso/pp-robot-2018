#ifndef _ROS_laser_bot_battle_Robot_msg_h
#define _ROS_laser_bot_battle_Robot_msg_h

#include <stdint.h>
#include <string.h>
#include <stdlib.h>
#include "ros/msg.h"

namespace laser_bot_battle
{

  class Robot_msg : public ros::Msg
  {
    public:
      typedef int8_t _linear_x_type;
      _linear_x_type linear_x;
      typedef int8_t _angular_z_type;
      _angular_z_type angular_z;
      typedef bool _shoot_type;
      _shoot_type shoot;

    Robot_msg():
      linear_x(0),
      angular_z(0),
      shoot(0)
    {
    }

    virtual int serialize(unsigned char *outbuffer) const
    {
      int offset = 0;
      union {
        int8_t real;
        uint8_t base;
      } u_linear_x;
      u_linear_x.real = this->linear_x;
      *(outbuffer + offset + 0) = (u_linear_x.base >> (8 * 0)) & 0xFF;
      offset += sizeof(this->linear_x);
      union {
        int8_t real;
        uint8_t base;
      } u_angular_z;
      u_angular_z.real = this->angular_z;
      *(outbuffer + offset + 0) = (u_angular_z.base >> (8 * 0)) & 0xFF;
      offset += sizeof(this->angular_z);
      union {
        bool real;
        uint8_t base;
      } u_shoot;
      u_shoot.real = this->shoot;
      *(outbuffer + offset + 0) = (u_shoot.base >> (8 * 0)) & 0xFF;
      offset += sizeof(this->shoot);
      return offset;
    }

    virtual int deserialize(unsigned char *inbuffer)
    {
      int offset = 0;
      union {
        int8_t real;
        uint8_t base;
      } u_linear_x;
      u_linear_x.base = 0;
      u_linear_x.base |= ((uint8_t) (*(inbuffer + offset + 0))) << (8 * 0);
      this->linear_x = u_linear_x.real;
      offset += sizeof(this->linear_x);
      union {
        int8_t real;
        uint8_t base;
      } u_angular_z;
      u_angular_z.base = 0;
      u_angular_z.base |= ((uint8_t) (*(inbuffer + offset + 0))) << (8 * 0);
      this->angular_z = u_angular_z.real;
      offset += sizeof(this->angular_z);
      union {
        bool real;
        uint8_t base;
      } u_shoot;
      u_shoot.base = 0;
      u_shoot.base |= ((uint8_t) (*(inbuffer + offset + 0))) << (8 * 0);
      this->shoot = u_shoot.real;
      offset += sizeof(this->shoot);
     return offset;
    }

    const char * getType(){ return "laser_bot_battle/Robot_msg"; };
    const char * getMD5(){ return "aa81278360e1bdd1ffce0a4efe0ae199"; };

  };

}
#endif