#ifndef _ROS_SERVICE_AddNewRobot_h
#define _ROS_SERVICE_AddNewRobot_h
#include <stdint.h>
#include <string.h>
#include <stdlib.h>
#include "ros/msg.h"

namespace laser_bot_battle
{

static const char ADDNEWROBOT[] = "laser_bot_battle/AddNewRobot";

  class AddNewRobotRequest : public ros::Msg
  {
    public:

    AddNewRobotRequest()
    {
    }

    virtual int serialize(unsigned char *outbuffer) const
    {
      int offset = 0;
      return offset;
    }

    virtual int deserialize(unsigned char *inbuffer)
    {
      int offset = 0;
     return offset;
    }

    const char * getType(){ return ADDNEWROBOT; };
    const char * getMD5(){ return "d41d8cd98f00b204e9800998ecf8427e"; };

  };

  class AddNewRobotResponse : public ros::Msg
  {
    public:
      typedef int8_t _ID_type;
      _ID_type ID;

    AddNewRobotResponse():
      ID(0)
    {
    }

    virtual int serialize(unsigned char *outbuffer) const
    {
      int offset = 0;
      union {
        int8_t real;
        uint8_t base;
      } u_ID;
      u_ID.real = this->ID;
      *(outbuffer + offset + 0) = (u_ID.base >> (8 * 0)) & 0xFF;
      offset += sizeof(this->ID);
      return offset;
    }

    virtual int deserialize(unsigned char *inbuffer)
    {
      int offset = 0;
      union {
        int8_t real;
        uint8_t base;
      } u_ID;
      u_ID.base = 0;
      u_ID.base |= ((uint8_t) (*(inbuffer + offset + 0))) << (8 * 0);
      this->ID = u_ID.real;
      offset += sizeof(this->ID);
     return offset;
    }

    const char * getType(){ return ADDNEWROBOT; };
    const char * getMD5(){ return "0cb5143ed23a5de01874507c8711c4d5"; };

  };

  class AddNewRobot {
    public:
    typedef AddNewRobotRequest Request;
    typedef AddNewRobotResponse Response;
  };

}
#endif
