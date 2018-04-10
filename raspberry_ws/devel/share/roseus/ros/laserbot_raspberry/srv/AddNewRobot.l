;; Auto-generated. Do not edit!


(when (boundp 'laserbot_raspberry::AddNewRobot)
  (if (not (find-package "LASERBOT_RASPBERRY"))
    (make-package "LASERBOT_RASPBERRY"))
  (shadow 'AddNewRobot (find-package "LASERBOT_RASPBERRY")))
(unless (find-package "LASERBOT_RASPBERRY::ADDNEWROBOT")
  (make-package "LASERBOT_RASPBERRY::ADDNEWROBOT"))
(unless (find-package "LASERBOT_RASPBERRY::ADDNEWROBOTREQUEST")
  (make-package "LASERBOT_RASPBERRY::ADDNEWROBOTREQUEST"))
(unless (find-package "LASERBOT_RASPBERRY::ADDNEWROBOTRESPONSE")
  (make-package "LASERBOT_RASPBERRY::ADDNEWROBOTRESPONSE"))

(in-package "ROS")





(defclass laserbot_raspberry::AddNewRobotRequest
  :super ros::object
  :slots ())

(defmethod laserbot_raspberry::AddNewRobotRequest
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

(defclass laserbot_raspberry::AddNewRobotResponse
  :super ros::object
  :slots (_ID ))

(defmethod laserbot_raspberry::AddNewRobotResponse
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

(defclass laserbot_raspberry::AddNewRobot
  :super ros::object
  :slots ())

(setf (get laserbot_raspberry::AddNewRobot :md5sum-) "0cb5143ed23a5de01874507c8711c4d5")
(setf (get laserbot_raspberry::AddNewRobot :datatype-) "laserbot_raspberry/AddNewRobot")
(setf (get laserbot_raspberry::AddNewRobot :request) laserbot_raspberry::AddNewRobotRequest)
(setf (get laserbot_raspberry::AddNewRobot :response) laserbot_raspberry::AddNewRobotResponse)

(defmethod laserbot_raspberry::AddNewRobotRequest
  (:response () (instance laserbot_raspberry::AddNewRobotResponse :init)))

(setf (get laserbot_raspberry::AddNewRobotRequest :md5sum-) "0cb5143ed23a5de01874507c8711c4d5")
(setf (get laserbot_raspberry::AddNewRobotRequest :datatype-) "laserbot_raspberry/AddNewRobotRequest")
(setf (get laserbot_raspberry::AddNewRobotRequest :definition-)
      "

---
int8 ID


")

(setf (get laserbot_raspberry::AddNewRobotResponse :md5sum-) "0cb5143ed23a5de01874507c8711c4d5")
(setf (get laserbot_raspberry::AddNewRobotResponse :datatype-) "laserbot_raspberry/AddNewRobotResponse")
(setf (get laserbot_raspberry::AddNewRobotResponse :definition-)
      "

---
int8 ID


")



(provide :laserbot_raspberry/AddNewRobot "0cb5143ed23a5de01874507c8711c4d5")


