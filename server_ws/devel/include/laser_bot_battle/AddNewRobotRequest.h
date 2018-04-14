// Generated by gencpp from file laser_bot_battle/AddNewRobotRequest.msg
// DO NOT EDIT!


#ifndef LASER_BOT_BATTLE_MESSAGE_ADDNEWROBOTREQUEST_H
#define LASER_BOT_BATTLE_MESSAGE_ADDNEWROBOTREQUEST_H


#include <string>
#include <vector>
#include <map>

#include <ros/types.h>
#include <ros/serialization.h>
#include <ros/builtin_message_traits.h>
#include <ros/message_operations.h>


namespace laser_bot_battle
{
template <class ContainerAllocator>
struct AddNewRobotRequest_
{
  typedef AddNewRobotRequest_<ContainerAllocator> Type;

  AddNewRobotRequest_()
    {
    }
  AddNewRobotRequest_(const ContainerAllocator& _alloc)
    {
  (void)_alloc;
    }







  typedef boost::shared_ptr< ::laser_bot_battle::AddNewRobotRequest_<ContainerAllocator> > Ptr;
  typedef boost::shared_ptr< ::laser_bot_battle::AddNewRobotRequest_<ContainerAllocator> const> ConstPtr;

}; // struct AddNewRobotRequest_

typedef ::laser_bot_battle::AddNewRobotRequest_<std::allocator<void> > AddNewRobotRequest;

typedef boost::shared_ptr< ::laser_bot_battle::AddNewRobotRequest > AddNewRobotRequestPtr;
typedef boost::shared_ptr< ::laser_bot_battle::AddNewRobotRequest const> AddNewRobotRequestConstPtr;

// constants requiring out of line definition



template<typename ContainerAllocator>
std::ostream& operator<<(std::ostream& s, const ::laser_bot_battle::AddNewRobotRequest_<ContainerAllocator> & v)
{
ros::message_operations::Printer< ::laser_bot_battle::AddNewRobotRequest_<ContainerAllocator> >::stream(s, "", v);
return s;
}

} // namespace laser_bot_battle

namespace ros
{
namespace message_traits
{



// BOOLTRAITS {'IsFixedSize': True, 'IsMessage': True, 'HasHeader': False}
// {'laser_bot_battle': ['/mnt/ros/pp-robot-2018/server_ws/src/laser_bot_battle/msg'], 'std_msgs': ['/opt/ros/kinetic/share/std_msgs/cmake/../msg']}

// !!!!!!!!!!! ['__class__', '__delattr__', '__dict__', '__doc__', '__eq__', '__format__', '__getattribute__', '__hash__', '__init__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', '_parsed_fields', 'constants', 'fields', 'full_name', 'has_header', 'header_present', 'names', 'package', 'parsed_fields', 'short_name', 'text', 'types']




template <class ContainerAllocator>
struct IsFixedSize< ::laser_bot_battle::AddNewRobotRequest_<ContainerAllocator> >
  : TrueType
  { };

template <class ContainerAllocator>
struct IsFixedSize< ::laser_bot_battle::AddNewRobotRequest_<ContainerAllocator> const>
  : TrueType
  { };

template <class ContainerAllocator>
struct IsMessage< ::laser_bot_battle::AddNewRobotRequest_<ContainerAllocator> >
  : TrueType
  { };

template <class ContainerAllocator>
struct IsMessage< ::laser_bot_battle::AddNewRobotRequest_<ContainerAllocator> const>
  : TrueType
  { };

template <class ContainerAllocator>
struct HasHeader< ::laser_bot_battle::AddNewRobotRequest_<ContainerAllocator> >
  : FalseType
  { };

template <class ContainerAllocator>
struct HasHeader< ::laser_bot_battle::AddNewRobotRequest_<ContainerAllocator> const>
  : FalseType
  { };


template<class ContainerAllocator>
struct MD5Sum< ::laser_bot_battle::AddNewRobotRequest_<ContainerAllocator> >
{
  static const char* value()
  {
    return "d41d8cd98f00b204e9800998ecf8427e";
  }

  static const char* value(const ::laser_bot_battle::AddNewRobotRequest_<ContainerAllocator>&) { return value(); }
  static const uint64_t static_value1 = 0xd41d8cd98f00b204ULL;
  static const uint64_t static_value2 = 0xe9800998ecf8427eULL;
};

template<class ContainerAllocator>
struct DataType< ::laser_bot_battle::AddNewRobotRequest_<ContainerAllocator> >
{
  static const char* value()
  {
    return "laser_bot_battle/AddNewRobotRequest";
  }

  static const char* value(const ::laser_bot_battle::AddNewRobotRequest_<ContainerAllocator>&) { return value(); }
};

template<class ContainerAllocator>
struct Definition< ::laser_bot_battle::AddNewRobotRequest_<ContainerAllocator> >
{
  static const char* value()
  {
    return "\n\
\n\
";
  }

  static const char* value(const ::laser_bot_battle::AddNewRobotRequest_<ContainerAllocator>&) { return value(); }
};

} // namespace message_traits
} // namespace ros

namespace ros
{
namespace serialization
{

  template<class ContainerAllocator> struct Serializer< ::laser_bot_battle::AddNewRobotRequest_<ContainerAllocator> >
  {
    template<typename Stream, typename T> inline static void allInOne(Stream&, T)
    {}

    ROS_DECLARE_ALLINONE_SERIALIZER
  }; // struct AddNewRobotRequest_

} // namespace serialization
} // namespace ros

namespace ros
{
namespace message_operations
{

template<class ContainerAllocator>
struct Printer< ::laser_bot_battle::AddNewRobotRequest_<ContainerAllocator> >
{
  template<typename Stream> static void stream(Stream&, const std::string&, const ::laser_bot_battle::AddNewRobotRequest_<ContainerAllocator>&)
  {}
};

} // namespace message_operations
} // namespace ros

#endif // LASER_BOT_BATTLE_MESSAGE_ADDNEWROBOTREQUEST_H
