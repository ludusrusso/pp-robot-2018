;; Auto-generated. Do not edit!


(when (boundp 'laser_bot_battle::AddNewRobot)
  (if (not (find-package "LASER_BOT_BATTLE"))
    (make-package "LASER_BOT_BATTLE"))
  (shadow 'AddNewRobot (find-package "LASER_BOT_BATTLE")))
(unless (find-package "LASER_BOT_BATTLE::ADDNEWROBOT")
  (make-package "LASER_BOT_BATTLE::ADDNEWROBOT"))
(unless (find-package "LASER_BOT_BATTLE::ADDNEWROBOTREQUEST")
  (make-package "LASER_BOT_BATTLE::ADDNEWROBOTREQUEST"))
(unless (find-package "LASER_BOT_BATTLE::ADDNEWROBOTRESPONSE")
  (make-package "LASER_BOT_BATTLE::ADDNEWROBOTRESPONSE"))

(in-package "ROS")





(defclass laser_bot_battle::AddNewRobotRequest
  :super ros::object
  :slots ())

(defmethod laser_bot_battle::AddNewRobotRequest
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

(defclass laser_bot_battle::AddNewRobotResponse
  :super ros::object
  :slots (_ID ))

(defmethod laser_bot_battle::AddNewRobotResponse
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

(defclass laser_bot_battle::AddNewRobot
  :super ros::object
  :slots ())

(setf (get laser_bot_battle::AddNewRobot :md5sum-) "0cb5143ed23a5de01874507c8711c4d5")
(setf (get laser_bot_battle::AddNewRobot :datatype-) "laser_bot_battle/AddNewRobot")
(setf (get laser_bot_battle::AddNewRobot :request) laser_bot_battle::AddNewRobotRequest)
(setf (get laser_bot_battle::AddNewRobot :response) laser_bot_battle::AddNewRobotResponse)

(defmethod laser_bot_battle::AddNewRobotRequest
  (:response () (instance laser_bot_battle::AddNewRobotResponse :init)))

(setf (get laser_bot_battle::AddNewRobotRequest :md5sum-) "0cb5143ed23a5de01874507c8711c4d5")
(setf (get laser_bot_battle::AddNewRobotRequest :datatype-) "laser_bot_battle/AddNewRobotRequest")
(setf (get laser_bot_battle::AddNewRobotRequest :definition-)
      "

---
int8 ID


")

(setf (get laser_bot_battle::AddNewRobotResponse :md5sum-) "0cb5143ed23a5de01874507c8711c4d5")
(setf (get laser_bot_battle::AddNewRobotResponse :datatype-) "laser_bot_battle/AddNewRobotResponse")
(setf (get laser_bot_battle::AddNewRobotResponse :definition-)
      "

---
int8 ID


")



(provide :laser_bot_battle/AddNewRobot "0cb5143ed23a5de01874507c8711c4d5")


