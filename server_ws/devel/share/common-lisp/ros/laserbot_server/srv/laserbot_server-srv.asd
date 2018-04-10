
(cl:in-package :asdf)

(defsystem "laserbot_server-srv"
  :depends-on (:roslisp-msg-protocol :roslisp-utils )
  :components ((:file "_package")
    (:file "AddNewRobot" :depends-on ("_package_AddNewRobot"))
    (:file "_package_AddNewRobot" :depends-on ("_package"))
  ))