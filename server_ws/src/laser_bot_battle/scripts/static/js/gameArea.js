/*! gameArea.js */
/* This javascript is imported within home.html */

// Timeout of updating area set to 25ms
const UPDATE_AREA = 25; /* ms */
var wasStill = false;

/* Connecting to ROS */

var ros = new ROSLIB.Ros({
  url : 'ws://laser_bot_master.local:9090'
});

/* Topic definition */
var topic = new ROSLIB.Topic({
  ros : ros,
  name : '',
  messageType : 'laser_bot_battle/Robot_msg'
});

/* Default message to be sent on the topic
  It is modified later accordingly before being sent */
var robot_msg = new ROSLIB.Message({
  linear_x :  0,
  angular_z : 0,
  shoot :     false
});

/* Managing the key arrows pressure through a keyCode map
  - keyDown() - Update the map with the button that has been pressed
  - keyUp()   - Update the map with the button that has been released */
function keyDown(e) {
  myGameArea.keys = (myGameArea.keys || []);
  myGameArea.keys[e.keyCode] = true;
}
function keyUp(e) {
  myGameArea.keys[e.keyCode] = false;
}

/* Defining object myGameArea with 2 functions:
  - start(): launch updateGameArea() each UPDATE_AREA ms
              enabling event sensitivity for keyDown and keypress
  - stop(): stop the calling to updateGameArea() and remove
            the sensitivity to the events keyDown and keyUp
  */
var myGameArea = {

  start : function() {
    /* Launch updateGameArea() function every UPDATE_AREA ms */
    this.interval = setInterval(updateGameArea, UPDATE_AREA);

    /* Associating the above defined keyUp/Down() functions to the keydown/up events */
    window.addEventListener('keydown', keyDown)
    window.addEventListener('keyup', keyUp)
  },

  stop : function() {
    /* Stop updateGameArea update */
    window.clearInterval(this.interval);

    /* Dis-associating the above defined keyUp/Down() functions to the keydown/up events */
    window.removeEventListener('keydown', keyDown)
    window.removeEventListener('keyup', keyUp)
  }

};

/* This function is invoked every UPDATE_AREA ms.
  It modifies the robot_msg to be sent on the topic according
  to the commands received by the user (key pressures) */
function updateGameArea() {
  robot_msg.linear_x = 0;
  robot_msg.angular_z = 0;
  robot_msg.shoot = false;

  /* Saving on temporal variables the intended action */
  var left  = myGameArea.keys && ( myGameArea.keys[37] || myGameArea.keys[65] );
  var up    = myGameArea.keys && ( myGameArea.keys[38] || myGameArea.keys[87] );
  var right = myGameArea.keys && ( myGameArea.keys[39] || myGameArea.keys[68] );
  var down  = myGameArea.keys && ( myGameArea.keys[40] || myGameArea.keys[83] );
  var shoot = myGameArea.keys && ( myGameArea.keys[13] || myGameArea.keys[32] );

  /* robot_msg to be sent modified here: */

  /* LEFT */
  if ( left && (! right) ) {
    robot_msg.angular_z = -1;
  }

  /* RIGHT */
  else if ( right && (! left) ) {
    robot_msg.angular_z = 1;
  }

  /* UP */
  if ( up && (! down) ) {
    robot_msg.linear_x = 1;
  }

  /* DOWN */
  else if ( down && (! up) ) {
    robot_msg.linear_x = -1;
  }

  /* SHOOT */
  if ( shoot ) {
    robot_msg.shoot = true;
  }

  /* publish message only if robot is intended to act (move or shoot) */
  if (! wasStill){
    /* publishing the robot_msg modified above */
    topic.publish(robot_msg);
    console.log(JSON.stringify(robot_msg));
  }

  /* if robot is still, next time don't send message (if still again) */
  wasStill = ( robot_msg.linear_x == 0 && robot_msg.angular_z == 0 && !robot_msg.shoot );
}

/* When the page "home.html" is loaded */
$(document).ready(function(){

  ros.on('connection', function() {
    console.log('Connected to websocket server.');
  });

  /* If ROSBridge connection fails : disconnect the user and go back to Homepage */
  ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
    swal({
      title: "Error connecting to ROSBridge server!",
      text: "The game can not start without a working connection to ROSBridge websocket server",
      icon: "error",
      button: false,
      timer: 5000,
    });
    setTimeout(function(){
      delUser(user.name);
      location.href = "/";
    }, 5100);

  });

  ros.on('close', function() {
    console.log('Connection to websocket server closed.');
  });

  /* Set up the topic name univocally (one topic per robot).
    Information about the robotID is retrieved from the
    'user' structure (defined in manageUsers.js) */
  topic.name='/Robot' + user.robotN + '/command';

});
