; Auto-generated. Do not edit!


(cl:in-package laser_bot_battle-srv)


;//! \htmlinclude AddNewRobot-request.msg.html

(cl:defclass <AddNewRobot-request> (roslisp-msg-protocol:ros-message)
  ()
)

(cl:defclass AddNewRobot-request (<AddNewRobot-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <AddNewRobot-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'AddNewRobot-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name laser_bot_battle-srv:<AddNewRobot-request> is deprecated: use laser_bot_battle-srv:AddNewRobot-request instead.")))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <AddNewRobot-request>) ostream)
  "Serializes a message object of type '<AddNewRobot-request>"
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <AddNewRobot-request>) istream)
  "Deserializes a message object of type '<AddNewRobot-request>"
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<AddNewRobot-request>)))
  "Returns string type for a service object of type '<AddNewRobot-request>"
  "laser_bot_battle/AddNewRobotRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'AddNewRobot-request)))
  "Returns string type for a service object of type 'AddNewRobot-request"
  "laser_bot_battle/AddNewRobotRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<AddNewRobot-request>)))
  "Returns md5sum for a message object of type '<AddNewRobot-request>"
  "0cb5143ed23a5de01874507c8711c4d5")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'AddNewRobot-request)))
  "Returns md5sum for a message object of type 'AddNewRobot-request"
  "0cb5143ed23a5de01874507c8711c4d5")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<AddNewRobot-request>)))
  "Returns full string definition for message of type '<AddNewRobot-request>"
  (cl:format cl:nil "~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'AddNewRobot-request)))
  "Returns full string definition for message of type 'AddNewRobot-request"
  (cl:format cl:nil "~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <AddNewRobot-request>))
  (cl:+ 0
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <AddNewRobot-request>))
  "Converts a ROS message object to a list"
  (cl:list 'AddNewRobot-request
))
;//! \htmlinclude AddNewRobot-response.msg.html

(cl:defclass <AddNewRobot-response> (roslisp-msg-protocol:ros-message)
  ((ID
    :reader ID
    :initarg :ID
    :type cl:fixnum
    :initform 0))
)

(cl:defclass AddNewRobot-response (<AddNewRobot-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <AddNewRobot-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'AddNewRobot-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name laser_bot_battle-srv:<AddNewRobot-response> is deprecated: use laser_bot_battle-srv:AddNewRobot-response instead.")))

(cl:ensure-generic-function 'ID-val :lambda-list '(m))
(cl:defmethod ID-val ((m <AddNewRobot-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader laser_bot_battle-srv:ID-val is deprecated.  Use laser_bot_battle-srv:ID instead.")
  (ID m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <AddNewRobot-response>) ostream)
  "Serializes a message object of type '<AddNewRobot-response>"
  (cl:let* ((signed (cl:slot-value msg 'ID)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 256) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    )
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <AddNewRobot-response>) istream)
  "Deserializes a message object of type '<AddNewRobot-response>"
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'ID) (cl:if (cl:< unsigned 128) unsigned (cl:- unsigned 256))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<AddNewRobot-response>)))
  "Returns string type for a service object of type '<AddNewRobot-response>"
  "laser_bot_battle/AddNewRobotResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'AddNewRobot-response)))
  "Returns string type for a service object of type 'AddNewRobot-response"
  "laser_bot_battle/AddNewRobotResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<AddNewRobot-response>)))
  "Returns md5sum for a message object of type '<AddNewRobot-response>"
  "0cb5143ed23a5de01874507c8711c4d5")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'AddNewRobot-response)))
  "Returns md5sum for a message object of type 'AddNewRobot-response"
  "0cb5143ed23a5de01874507c8711c4d5")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<AddNewRobot-response>)))
  "Returns full string definition for message of type '<AddNewRobot-response>"
  (cl:format cl:nil "int8 ID~%~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'AddNewRobot-response)))
  "Returns full string definition for message of type 'AddNewRobot-response"
  (cl:format cl:nil "int8 ID~%~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <AddNewRobot-response>))
  (cl:+ 0
     1
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <AddNewRobot-response>))
  "Converts a ROS message object to a list"
  (cl:list 'AddNewRobot-response
    (cl:cons ':ID (ID msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'AddNewRobot)))
  'AddNewRobot-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'AddNewRobot)))
  'AddNewRobot-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'AddNewRobot)))
  "Returns string type for a service object of type '<AddNewRobot>"
  "laser_bot_battle/AddNewRobot")