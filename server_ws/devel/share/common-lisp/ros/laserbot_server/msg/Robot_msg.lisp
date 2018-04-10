; Auto-generated. Do not edit!


(cl:in-package laserbot_server-msg)


;//! \htmlinclude Robot_msg.msg.html

(cl:defclass <Robot_msg> (roslisp-msg-protocol:ros-message)
  ((linear_x
    :reader linear_x
    :initarg :linear_x
    :type cl:fixnum
    :initform 0)
   (angular_z
    :reader angular_z
    :initarg :angular_z
    :type cl:fixnum
    :initform 0)
   (shoot
    :reader shoot
    :initarg :shoot
    :type cl:boolean
    :initform cl:nil))
)

(cl:defclass Robot_msg (<Robot_msg>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <Robot_msg>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'Robot_msg)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name laserbot_server-msg:<Robot_msg> is deprecated: use laserbot_server-msg:Robot_msg instead.")))

(cl:ensure-generic-function 'linear_x-val :lambda-list '(m))
(cl:defmethod linear_x-val ((m <Robot_msg>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader laserbot_server-msg:linear_x-val is deprecated.  Use laserbot_server-msg:linear_x instead.")
  (linear_x m))

(cl:ensure-generic-function 'angular_z-val :lambda-list '(m))
(cl:defmethod angular_z-val ((m <Robot_msg>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader laserbot_server-msg:angular_z-val is deprecated.  Use laserbot_server-msg:angular_z instead.")
  (angular_z m))

(cl:ensure-generic-function 'shoot-val :lambda-list '(m))
(cl:defmethod shoot-val ((m <Robot_msg>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader laserbot_server-msg:shoot-val is deprecated.  Use laserbot_server-msg:shoot instead.")
  (shoot m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <Robot_msg>) ostream)
  "Serializes a message object of type '<Robot_msg>"
  (cl:let* ((signed (cl:slot-value msg 'linear_x)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 256) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'angular_z)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 256) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    )
  (cl:write-byte (cl:ldb (cl:byte 8 0) (cl:if (cl:slot-value msg 'shoot) 1 0)) ostream)
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <Robot_msg>) istream)
  "Deserializes a message object of type '<Robot_msg>"
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'linear_x) (cl:if (cl:< unsigned 128) unsigned (cl:- unsigned 256))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'angular_z) (cl:if (cl:< unsigned 128) unsigned (cl:- unsigned 256))))
    (cl:setf (cl:slot-value msg 'shoot) (cl:not (cl:zerop (cl:read-byte istream))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<Robot_msg>)))
  "Returns string type for a message object of type '<Robot_msg>"
  "laserbot_server/Robot_msg")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'Robot_msg)))
  "Returns string type for a message object of type 'Robot_msg"
  "laserbot_server/Robot_msg")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<Robot_msg>)))
  "Returns md5sum for a message object of type '<Robot_msg>"
  "aa81278360e1bdd1ffce0a4efe0ae199")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'Robot_msg)))
  "Returns md5sum for a message object of type 'Robot_msg"
  "aa81278360e1bdd1ffce0a4efe0ae199")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<Robot_msg>)))
  "Returns full string definition for message of type '<Robot_msg>"
  (cl:format cl:nil "int8 linear_x~%int8 angular_z~%bool shoot~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'Robot_msg)))
  "Returns full string definition for message of type 'Robot_msg"
  (cl:format cl:nil "int8 linear_x~%int8 angular_z~%bool shoot~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <Robot_msg>))
  (cl:+ 0
     1
     1
     1
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <Robot_msg>))
  "Converts a ROS message object to a list"
  (cl:list 'Robot_msg
    (cl:cons ':linear_x (linear_x msg))
    (cl:cons ':angular_z (angular_z msg))
    (cl:cons ':shoot (shoot msg))
))
