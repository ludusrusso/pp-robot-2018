;; Auto-generated. Do not edit!


(when (boundp 'laserbot_raspberry::Robot_msg)
  (if (not (find-package "LASERBOT_RASPBERRY"))
    (make-package "LASERBOT_RASPBERRY"))
  (shadow 'Robot_msg (find-package "LASERBOT_RASPBERRY")))
(unless (find-package "LASERBOT_RASPBERRY::ROBOT_MSG")
  (make-package "LASERBOT_RASPBERRY::ROBOT_MSG"))

(in-package "ROS")
;;//! \htmlinclude Robot_msg.msg.html


(defclass laserbot_raspberry::Robot_msg
  :super ros::object
  :slots (_linear_x _angular_z _shoot ))

(defmethod laserbot_raspberry::Robot_msg
  (:init
   (&key
    ((:linear_x __linear_x) 0)
    ((:angular_z __angular_z) 0)
    ((:shoot __shoot) nil)
    )
   (send-super :init)
   (setq _linear_x (round __linear_x))
   (setq _angular_z (round __angular_z))
   (setq _shoot __shoot)
   self)
  (:linear_x
   (&optional __linear_x)
   (if __linear_x (setq _linear_x __linear_x)) _linear_x)
  (:angular_z
   (&optional __angular_z)
   (if __angular_z (setq _angular_z __angular_z)) _angular_z)
  (:shoot
   (&optional __shoot)
   (if __shoot (setq _shoot __shoot)) _shoot)
  (:serialization-length
   ()
   (+
    ;; int8 _linear_x
    1
    ;; int8 _angular_z
    1
    ;; bool _shoot
    1
    ))
  (:serialize
   (&optional strm)
   (let ((s (if strm strm
              (make-string-output-stream (send self :serialization-length)))))
     ;; int8 _linear_x
       (write-byte _linear_x s)
     ;; int8 _angular_z
       (write-byte _angular_z s)
     ;; bool _shoot
       (if _shoot (write-byte -1 s) (write-byte 0 s))
     ;;
     (if (null strm) (get-output-stream-string s))))
  (:deserialize
   (buf &optional (ptr- 0))
   ;; int8 _linear_x
     (setq _linear_x (sys::peek buf ptr- :char)) (incf ptr- 1)
     (if (> _linear_x 127) (setq _linear_x (- _linear_x 256)))
   ;; int8 _angular_z
     (setq _angular_z (sys::peek buf ptr- :char)) (incf ptr- 1)
     (if (> _angular_z 127) (setq _angular_z (- _angular_z 256)))
   ;; bool _shoot
     (setq _shoot (not (= 0 (sys::peek buf ptr- :char)))) (incf ptr- 1)
   ;;
   self)
  )

(setf (get laserbot_raspberry::Robot_msg :md5sum-) "aa81278360e1bdd1ffce0a4efe0ae199")
(setf (get laserbot_raspberry::Robot_msg :datatype-) "laserbot_raspberry/Robot_msg")
(setf (get laserbot_raspberry::Robot_msg :definition-)
      "int8 linear_x
int8 angular_z
bool shoot

")



(provide :laserbot_raspberry/Robot_msg "aa81278360e1bdd1ffce0a4efe0ae199")


