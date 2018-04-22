/*! gameArea.js */

const UPDATE_AREA = 25; /* ms */
var wasStill = false;

/* Connecting to ROS */

var ros = new ROSLIB.Ros({
  url : 'ws://laser_bot_master.local:9090'
});

/* Publisher */

var topic = new ROSLIB.Topic({
  ros : ros,
  name : '',
  messageType : 'laser_bot_battle/Robot_msg'
});

var robot_msg = new ROSLIB.Message({
  linear_x :  0,
  angular_z : 0,
  shoot :     false
});

function keyDown(e) {
  myGameArea.keys = (myGameArea.keys || []);
  myGameArea.keys[e.keyCode] = true;
}
function keyUp(e) {
  myGameArea.keys[e.keyCode] = false;
}

var myGameArea = {

  start : function() {
    /* Launch updateGameArea function every UPDATE_AREA ms */
    this.interval = setInterval(updateGameArea, UPDATE_AREA);

    window.addEventListener('keydown', keyDown)
    window.addEventListener('keyup', keyUp)
  },
  stop : function() {
    /* Stop updateGameArea update */
    window.clearInterval(this.interval); 

    window.removeEventListener('keydown', keyDown)
    window.removeEventListener('keyup', keyUp)
  }

};


function updateGameArea() {
  robot_msg.linear_x = 0;
  robot_msg.angular_z = 0;
  robot_msg.shoot = false;

  var left  = myGameArea.keys && ( myGameArea.keys[37] || myGameArea.keys[65] );
  var up    = myGameArea.keys && ( myGameArea.keys[38] || myGameArea.keys[87] );
  var right = myGameArea.keys && ( myGameArea.keys[39] || myGameArea.keys[68] );
  var down  = myGameArea.keys && ( myGameArea.keys[40] || myGameArea.keys[83] );
  var shoot = myGameArea.keys && ( myGameArea.keys[13] || myGameArea.keys[32] );

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

  if (! wasStill){
    /* publish message */
    topic.publish(robot_msg);
    console.log(JSON.stringify(robot_msg));
  }

  /* if robot is still, next time don't send message (if still again)*/
  wasStill = ( robot_msg.linear_x == 0 && robot_msg.angular_z == 0 && !robot_msg.shoot );
} 


$(document).ready(function(){

  ros.on('connection', function() {
    console.log('Connected to websocket server.');
  });

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

  topic.name='/Robot' + user.robotN + '/command';

});
