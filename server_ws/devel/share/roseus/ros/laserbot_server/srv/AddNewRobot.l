;; Auto-generated. Do not edit!


(when (boundp 'laserbot_server::AddNewRobot)
  (if (not (find-package "LASERBOT_SERVER"))
    (make-package "LASERBOT_SERVER"))
  (shadow 'AddNewRobot (find-package "LASERBOT_SERVER")))
(unless (find-package "LASERBOT_SERVER::ADDNEWROBOT")
  (make-package "LASERBOT_SERVER::ADDNEWROBOT"))
(unless (find-package "LASERBOT_SERVER::ADDNEWROBOTREQUEST")
  (make-package "LASERBOT_SERVER::ADDNEWROBOTREQUEST"))
(unless (find-package "LASERBOT_SERVER::ADDNEWROBOTRESPONSE")
  (make-package "LASERBOT_SERVER::ADDNEWROBOTRESPONSE"))

(in-package "ROS")





(defclass laserbot_server::AddNewRobotRequest
  :super ros::object
  :slots ())

(defmethod laserbot_server::AddNewRobotRequest
  (:init
   (&key
    )
   (send-super :init)
   self)
  (:serialization-length
   ()
   (+
    0
    ))
  (:serialize
   (&optional strm)
   (let ((s (if strm strm
              (make-string-output-stream (send self :serialization-length)))))
     ;;
     (if (null strm) (get-output-stream-string s))))
  (:deserialize
   (buf &optional (ptr- 0))
   ;;
   self)
  )

(defclass laserbot_server::AddNewRobotResponse
  :super ros::object
  :slots (_ID ))

(defmethod laserbot_server::AddNewRobotResponse
  (:init
   (&key
    ((:ID __ID) 0)
    )
   (send-super :init)
   (setq _ID (round __ID))
   self)
  (:ID
   (&optional __ID)
   (if __ID (setq _ID __ID)) _ID)
  (:serialization-length
   ()
   (+
    ;; int8 _ID
    1
    ))
  (:serialize
   (&optional strm)
   (let ((s (if strm strm
              (make-string-output-stream (send self :serialization-length)))))
     ;; int8 _ID
       (write-byte _ID s)
     ;;
     (if (null strm) (get-output-stream-string s))))
  (:deserialize
   (buf &optional (ptr- 0))
   ;; int8 _ID
     (setq _ID (sys::peek buf ptr- :char)) (incf ptr- 1)
     (if (> _ID 127) (setq _ID (- _ID 256)))
   ;;
   self)
  )

(defclass laserbot_server::AddNewRobot
  :super ros::object
  :slots ())

(setf (get laserbot_server::AddNewRobot :md5sum-) "0cb5143ed23a5de01874507c8711c4d5")
(setf (get laserbot_server::AddNewRobot :datatype-) "laserbot_server/AddNewRobot")
(setf (get laserbot_server::AddNewRobot :request) laserbot_server::AddNewRobotRequest)
(setf (get laserbot_server::AddNewRobot :response) laserbot_server::AddNewRobotResponse)

(defmethod laserbot_server::AddNewRobotRequest
  (:response () (instance laserbot_server::AddNewRobotResponse :init)))

(setf (get laserbot_server::AddNewRobotRequest :md5sum-) "0cb5143ed23a5de01874507c8711c4d5")
(setf (get laserbot_server::AddNewRobotRequest :datatype-) "laserbot_server/AddNewRobotRequest")
(setf (get laserbot_server::AddNewRobotRequest :definition-)
      "

---
int8 ID


")

(setf (get laserbot_server::AddNewRobotResponse :md5sum-) "0cb5143ed23a5de01874507c8711c4d5")
(setf (get laserbot_server::AddNewRobotResponse :datatype-) "laserbot_server/AddNewRobotResponse")
(setf (get laserbot_server::AddNewRobotResponse :definition-)
      "

---
int8 ID


")



(provide :laserbot_server/AddNewRobot "0cb5143ed23a5de01874507c8711c4d5")


