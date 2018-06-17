![LaserBot Battle](documentation/logo/lbb_logo.png)

A <a href="http://www.ros.org">ROS</a> based application for wirelessly controlling robots and let them fight with lasers.

---

## Table of Contents
- [Installation](#installation)
    - [Docker](#docker)
    - [Arduino](#arduino)
- [High Level Architecture](#high-level-architecture)
    - [Web Server](#web-server)
    - [Raspberry](#raspberry)
    - [Arduino](#arduino)
- [Usage](#usage)
    - [Web Server](#web-server)
    - [Raspberry](#raspberry)
    - [Arduino](#arduino)
- [Documentation](#documentation)
- [History](#history)
- [License](#license)

## Installation

  ### Docker
  To automatically install docker-ce on the system
  
  ```bash
  $ curl -fsSL get.docker.com | sudo sh
  ```

  If you would like to use Docker as a non-root user, you should now consider adding your user to the
  "docker" group with something like:
  
  ```bash
  $ sudo usermod -aG docker $USER
  ```

  Remember to log out and back in for this to take effect!
  
  ### Arduino
  
  It is required to have <a href="https://www.arduino.cc/en/Main/Software">Arduino IDE</a> installed on the working PC to be able to properly flash Arduino with the proper sketch. Use the link provided to download and install it before proceeding with the following configuration.


## High Level Architecture

  ### Web Application
  It is the web application for the users to log-in, command the robot and check battle status. 
  
  ### Web Server
  It is the host initiating the ROS network (roscore launched here). It is used in order to receive Post requests from clients (browsers) and to forward them to robots raspberry, in the form of ROS messages and viceversa. Moreover it is in charge of updating battle status (robot life, logged users, actions to be performed in response to received commands).

  ### Raspberry 
  It generates a ROS node (robot) exchanging messages with the ROS master and the Arduino board. It is used to forward commands coming from the Server to Arduino (performing the proper actuations) and to retrieve sensors notification from Arduino to be forwarded to the Server (updating battle status).

  ### Arduino 
  It is used to drive the motors and the IR emitter, in response of Raspberry requests. It is provided with IR sensors, such that detecting and notifying when a robot is hit.

## Usage

  ### Web Server
  
  In order to run the Web Server docker image (and download it if not already done), run the following command on a x86 pc arch with docker installed:
  
  ```bash
  $ sudo docker-compose run server
  ```
  
  ### Raspberry
  
  In order to run the Raspberry docker image (and download it if not already done), run the following command on a Raspberry board with docker installed:
    
  ```bash
  $ sudo docker-compose run robot
  ```
  
  ### Arduino
  
  Connect the Arduino (alreaady flashed) to the Raspberry with a usb cable.


## Documentation

  An [User Manual](documentation/manual/user-manual.pdf) and a [Tech Manual](documentation/manual/tech-manual.pdf) are availeble.

## History

  - 2018/06/02 - Version 1.0 - First stable beta version release


## License

This project is licensed under the BSD 3 License - see the [LICENSE](LICENSE) file for details.
