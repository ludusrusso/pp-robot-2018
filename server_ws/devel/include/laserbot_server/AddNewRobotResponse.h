// Generated by gencpp from file laserbot_server/AddNewRobotResponse.msg
// DO NOT EDIT!


#ifndef LASERBOT_SERVER_MESSAGE_ADDNEWROBOTRESPONSE_H
#define LASERBOT_SERVER_MESSAGE_ADDNEWROBOTRESPONSE_H


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
struct AddNewRobotResponse_
{
  typedef AddNewRobotResponse_<ContainerAllocator> Type;

  AddNewRobotResponse_()
    : ID(0)  {
    }
  AddNewRobotResponse_(const ContainerAllocator& _alloc)
    : ID(0)  {
  (void)_alloc;
    }



   typedef int8_t _ID_type;
  _ID_type ID;




  typedef boost::shared_ptr< ::laserbot_server::AddNewRobotResponse_<ContainerAllocator> > Ptr;
  typedef boost::shared_ptr< ::laserbot_server::AddNewRobotResponse_<ContainerAllocator> const> ConstPtr;

}; // struct AddNewRobotResponse_

typedef ::laserbot_server::AddNewRobotResponse_<std::allocator<void> > AddNewRobotResponse;

typedef boost::shared_ptr< ::laserbot_server::AddNewRobotResponse > AddNewRobotResponsePtr;
typedef boost::shared_ptr< ::laserbot_server::AddNewRobotResponse const> AddNewRobotResponseConstPtr;

// constants requiring out of line definition



template<typename ContainerAllocator>
std::ostream& operator<<(std::ostream& s, const ::laserbot_server::AddNewRobotResponse_<ContainerAllocator> & v)
{
ros::message_operations::Printer< ::laserbot_server::AddNewRobotResponse_<ContainerAllocator> >::stream(s, "", v);
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
struct IsFixedSize< ::laserbot_server::AddNewRobotResponse_<ContainerAllocator> >
  : TrueType
  { };

template <class ContainerAllocator>
struct IsFixedSize< ::laserbot_server::AddNewRobotResponse_<ContainerAllocator> const>
  : TrueType
  { };

template <class ContainerAllocator>
struct IsMessage< ::laserbot_server::AddNewRobotResponse_<ContainerAllocator> >
  : TrueType
  { };

template <class ContainerAllocator>
struct IsMessage< ::laserbot_server::AddNewRobotResponse_<ContainerAllocator> const>
  : TrueType
  { };

template <class ContainerAllocator>
struct HasHeader< ::laserbot_server::AddNewRobotResponse_<ContainerAllocator> >
  : FalseType
  { };

template <class ContainerAllocator>
struct HasHeader< ::laserbot_server::AddNewRobotResponse_<ContainerAllocator> const>
  : FalseType
  { };


template<class ContainerAllocator>
struct MD5Sum< ::laserbot_server::AddNewRobotResponse_<ContainerAllocator> >
{
  static const char* value()
  {
    return "0cb5143ed23a5de01874507c8711c4d5";
  }

  static const char* value(const ::laserbot_server::AddNewRobotResponse_<ContainerAllocator>&) { return value(); }
  static const uint64_t static_value1 = 0x0cb5143ed23a5de0ULL;
  static const uint64_t static_value2 = 0x1874507c8711c4d5ULL;
};

template<class ContainerAllocator>
struct DataType< ::laserbot_server::AddNewRobotResponse_<ContainerAllocator> >
{
  static const char* value()
  {
    return "laserbot_server/AddNewRobotResponse";
  }

  static const char* value(const ::laserbot_server::AddNewRobotResponse_<ContainerAllocator>&) { return value(); }
};

template<class ContainerAllocator>
struct Definition< ::laserbot_server::AddNewRobotResponse_<ContainerAllocator> >
{
  static const char* value()
  {
    return "int8 ID\n\
\n\
\n\
";
  }

  static const char* value(const ::laserbot_server::AddNewRobotResponse_<ContainerAllocator>&) { return value(); }
};

} // namespace message_traits
} // namespace ros

namespace ros
{
namespace serialization
{

  template<class ContainerAllocator> struct Serializer< ::laserbot_server::AddNewRobotResponse_<ContainerAllocator> >
  {
    template<typename Stream, typename T> inline static void allInOne(Stream& stream, T m)
    {
      stream.next(m.ID);
    }

    ROS_DECLARE_ALLINONE_SERIALIZER
  }; // struct AddNewRobotResponse_

} // namespace serialization
} // namespace ros

namespace ros
{
namespace message_operations
{

template<class ContainerAllocator>
struct Printer< ::laserbot_server::AddNewRobotResponse_<ContainerAllocator> >
{
  template<typename Stream> static void stream(Stream& s, const std::string& indent, const ::laserbot_server::AddNewRobotResponse_<ContainerAllocator>& v)
  {
    s << indent << "ID: ";
    Printer<int8_t>::stream(s, indent + "  ", v.ID);
  }
};

} // namespace message_operations
} // namespace ros

#endif // LASERBOT_SERVER_MESSAGE_ADDNEWROBOTRESPONSE_H
