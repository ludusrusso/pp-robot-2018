
(cl:in-package :asdf)

(defsystem "laser_bot_battle-srv"
  :depends-on (:roslisp-msg-protocol :roslisp-utils )
  :components ((:file "_package")
    (:file "AddNewRobot" :depends-on ("_package_AddNewRobot"))
    (:file "_package_AddNewRobot" :depends-on ("_package"))
  ))