/*! gameArea.js */

const UPDATE_AREA = 25; /* ms */


/* Connecting to ROS */

var ros = new ROSLIB.Ros({
  url : 'ws://localhost:9090'
});

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

});

/* Publisher */

var topic = new ROSLIB.Topic({
  ros : ros,
  name : '/Robot' + user.robotN + '/commands',
  messageType : 'Robot_msg'
});

var robot_msg = new ROSLIB.Message({
  linear_x :  0,
  angular_z : 0,
  shoot :     false
});


/* Subscriber */

var topic_listener = new ROSLIB.Topic({
  ros : ros,
  name : '/Robot' + user.robotN + '/response',
  messageType : 'std_msgs/Empty'
});

topic_listener.subscribe(function(msg){
  console.log('Received message: ',  msg.data);
});


var myGameArea = {

  start : function() {
    /* Launch updateGameArea function every UPDATE_AREA ms */
    this.interval = setInterval(updateGameArea, UPDATE_AREA);

    window.addEventListener('keydown', function (e) {
      myGameArea.keys = (myGameArea.keys || []);
      myGameArea.keys[e.keyCode] = true;
    })
    window.addEventListener('keyup', function (e) {
      myGameArea.keys[e.keyCode] = false;
    })
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
    robot_msg.angular_z = 1;
    console.log('< left', robot_msg.linear_x, robot_msg.angular_z);
  }
  /* RIGHT */
  else if ( right && (! left) ) {
    robot_msg.angular_z = -1;
    console.log('> right', robot_msg.linear_x, robot_msg.angular_z);
  }

  /* UP */
  if ( up && (! down) ) {
    robot_msg.linear_x = 1;      
    console.log('^ up', robot_msg.linear_x, robot_msg.angular_z);
  }
  /* DOWN */
  else if ( down && (! up) ) {
    robot_msg.linear_x = -1;
    console.log('v down', robot_msg.linear_x, robot_msg.angular_z);
  }

  /* SHOOT */
  if ( shoot ) {
    robot_msg.shoot = true;      
    console.log('* shoot', robot_msg.shoot);
  }

  /* publish message */
  topic.publish(robot_msg);
} 
