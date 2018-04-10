
(cl:in-package :asdf)

(defsystem "laserbot_server-msg"
  :depends-on (:roslisp-msg-protocol :roslisp-utils )
  :components ((:file "_package")
    (:file "Robot_msg" :depends-on ("_package_Robot_msg"))
    (:file "_package_Robot_msg" :depends-on ("_package"))
  ))