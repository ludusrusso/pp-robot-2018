// Generated by gencpp from file laserbot_server/Robot_msg.msg
// DO NOT EDIT!


#ifndef LASERBOT_SERVER_MESSAGE_ROBOT_MSG_H
#define LASERBOT_SERVER_MESSAGE_ROBOT_MSG_H


#include <string>
#include <vector>
#include <map>

#include <ros/types.h>
#include <ros/serialization.h>
#include <ros/builtin_message_traits.h>
#include <ros/message_operations.h>


namespace laserbot_server
{
template <class ContainerAllocator>
struct Robot_msg_
{
  typedef Robot_msg_<ContainerAllocator> Type;

  Robot_msg_()
    : linear_x(0)
    , angular_z(0)
    , shoot(false)  {
    }
  Robot_msg_(const ContainerAllocator& _alloc)
    : linear_x(0)
    , angular_z(0)
    , shoot(false)  {
  (void)_alloc;
    }



   typedef int8_t _linear_x_type;
  _linear_x_type linear_x;

   typedef int8_t _angular_z_type;
  _angular_z_type angular_z;

   typedef uint8_t _shoot_type;
  _shoot_type shoot;




  typedef boost::shared_ptr< ::laserbot_server::Robot_msg_<ContainerAllocator> > Ptr;
  typedef boost::shared_ptr< ::laserbot_server::Robot_msg_<ContainerAllocator> const> ConstPtr;

}; // struct Robot_msg_

typedef ::laserbot_server::Robot_msg_<std::allocator<void> > Robot_msg;

typedef boost::shared_ptr< ::laserbot_server::Robot_msg > Robot_msgPtr;
typedef boost::shared_ptr< ::laserbot_server::Robot_msg const> Robot_msgConstPtr;

// constants requiring out of line definition



template<typename ContainerAllocator>
std::ostream& operator<<(std::ostream& s, const ::laserbot_server::Robot_msg_<ContainerAllocator> & v)
{
ros::message_operations::Printer< ::laserbot_server::Robot_msg_<ContainerAllocator> >::stream(s, "", v);
return s;
}

} // namespace laserbot_server

namespace ros
{
namespace message_traits
{



// BOOLTRAITS {'IsFixedSize': True, 'IsMessage': True, 'HasHeader': False}
// {'laserbot_server': ['/home/luca/Desktop/pp-robot-2018/server_ws/src/laser_bot_battle/msg'], 'std_msgs': ['/opt/ros/kinetic/share/std_msgs/cmake/../msg']}

// !!!!!!!!!!! ['__class__', '__delattr__', '__dict__', '__doc__', '__eq__', '__format__', '__getattribute__', '__hash__', '__init__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', '_parsed_fields', 'constants', 'fields', 'full_name', 'has_header', 'header_present', 'names', 'package', 'parsed_fields', 'short_name', 'text', 'types']




template <class ContainerAllocator>
struct IsFixedSize< ::laserbot_server::Robot_msg_<ContainerAllocator> >
  : TrueType
  { };

template <class ContainerAllocator>
struct IsFixedSize< ::laserbot_server::Robot_msg_<ContainerAllocator> const>
  : TrueType
  { };

template <class ContainerAllocator>
struct IsMessage< ::laserbot_server::Robot_msg_<ContainerAllocator> >
  : TrueType
  { };

template <class ContainerAllocator>
struct IsMessage< ::laserbot_server::Robot_msg_<ContainerAllocator> const>
  : TrueType
  { };

template <class ContainerAllocator>
struct HasHeader< ::laserbot_server::Robot_msg_<ContainerAllocator> >
  : FalseType
  { };

template <class ContainerAllocator>
struct HasHeader< ::laserbot_server::Robot_msg_<ContainerAllocator> const>
  : FalseType
  { };


template<class ContainerAllocator>
struct MD5Sum< ::laserbot_server::Robot_msg_<ContainerAllocator> >
{
  static const char* value()
  {
    return "aa81278360e1bdd1ffce0a4efe0ae199";
  }

  static const char* value(const ::laserbot_server::Robot_msg_<ContainerAllocator>&) { return value(); }
  static const uint64_t static_value1 = 0xaa81278360e1bdd1ULL;
  static const uint64_t static_value2 = 0xffce0a4efe0ae199ULL;
};

template<class ContainerAllocator>
struct DataType< ::laserbot_server::Robot_msg_<ContainerAllocator> >
{
  static const char* value()
  {
    return "laserbot_server/Robot_msg";
  }

  static const char* value(const ::laserbot_server::Robot_msg_<ContainerAllocator>&) { return value(); }
};

template<class ContainerAllocator>
struct Definition< ::laserbot_server::Robot_msg_<ContainerAllocator> >
{
  static const char* value()
  {
    return "int8 linear_x\n\
int8 angular_z\n\
bool shoot\n\
";
  }

  static const char* value(const ::laserbot_server::Robot_msg_<ContainerAllocator>&) { return value(); }
};

} // namespace message_traits
} // namespace ros

namespace ros
{
namespace serialization
{

  template<class ContainerAllocator> struct Serializer< ::laserbot_server::Robot_msg_<ContainerAllocator> >
  {
    template<typename Stream, typename T> inline static void allInOne(Stream& stream, T m)
    {
      stream.next(m.linear_x);
      stream.next(m.angular_z);
      stream.next(m.shoot);
    }

    ROS_DECLARE_ALLINONE_SERIALIZER
  }; // struct Robot_msg_

} // namespace serialization
} // namespace ros

namespace ros
{
namespace message_operations
{

template<class ContainerAllocator>
struct Printer< ::laserbot_server::Robot_msg_<ContainerAllocator> >
{
  template<typename Stream> static void stream(Stream& s, const std::string& indent, const ::laserbot_server::Robot_msg_<ContainerAllocator>& v)
  {
    s << indent << "linear_x: ";
    Printer<int8_t>::stream(s, indent + "  ", v.linear_x);
    s << indent << "angular_z: ";
    Printer<int8_t>::stream(s, indent + "  ", v.angular_z);
    s << indent << "shoot: ";
    Printer<uint8_t>::stream(s, indent + "  ", v.shoot);
  }
};

} // namespace message_operations
} // namespace ros

#endif // LASERBOT_SERVER_MESSAGE_ROBOT_MSG_H
