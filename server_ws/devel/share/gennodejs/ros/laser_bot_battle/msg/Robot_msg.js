// Auto-generated. Do not edit!

// (in-package laser_bot_battle.msg)


"use strict";

const _serializer = _ros_msg_utils.Serialize;
const _arraySerializer = _serializer.Array;
const _deserializer = _ros_msg_utils.Deserialize;
const _arrayDeserializer = _deserializer.Array;
const _finder = _ros_msg_utils.Find;
const _getByteLength = _ros_msg_utils.getByteLength;

//-----------------------------------------------------------

class Robot_msg {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.linear_x = null;
      this.angular_z = null;
      this.shoot = null;
    }
    else {
      if (initObj.hasOwnProperty('linear_x')) {
        this.linear_x = initObj.linear_x
      }
      else {
        this.linear_x = 0;
      }
      if (initObj.hasOwnProperty('angular_z')) {
        this.angular_z = initObj.angular_z
      }
      else {
        this.angular_z = 0;
      }
      if (initObj.hasOwnProperty('shoot')) {
        this.shoot = initObj.shoot
      }
      else {
        this.shoot = false;
      }
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type Robot_msg
    // Serialize message field [linear_x]
    bufferOffset = _serializer.int8(obj.linear_x, buffer, bufferOffset);
    // Serialize message field [angular_z]
    bufferOffset = _serializer.int8(obj.angular_z, buffer, bufferOffset);
    // Serialize message field [shoot]
    bufferOffset = _serializer.bool(obj.shoot, buffer, bufferOffset);
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    //deserializes a message object of type Robot_msg
    let len;
    let data = new Robot_msg(null);
    // Deserialize message field [linear_x]
    data.linear_x = _deserializer.int8(buffer, bufferOffset);
    // Deserialize message field [angular_z]
    data.angular_z = _deserializer.int8(buffer, bufferOffset);
    // Deserialize message field [shoot]
    data.shoot = _deserializer.bool(buffer, bufferOffset);
    return data;
  }

  static getMessageSize(object) {
    return 3;
  }

  static datatype() {
    // Returns string type for a message object
    return 'laser_bot_battle/Robot_msg';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return 'aa81278360e1bdd1ffce0a4efe0ae199';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    int8 linear_x
    int8 angular_z
    bool shoot
    
    `;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new Robot_msg(null);
    if (msg.linear_x !== undefined) {
      resolved.linear_x = msg.linear_x;
    }
    else {
      resolved.linear_x = 0
    }

    if (msg.angular_z !== undefined) {
      resolved.angular_z = msg.angular_z;
    }
    else {
      resolved.angular_z = 0
    }

    if (msg.shoot !== undefined) {
      resolved.shoot = msg.shoot;
    }
    else {
      resolved.shoot = false
    }

    return resolved;
    }
};

module.exports = Robot_msg;
