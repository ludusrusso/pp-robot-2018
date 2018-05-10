/*! manageUsers.js */
/*
 * INCLUDE JSON PARSE AND STRINGIFY IF NOT PRESENT
 * -----------------------
 *
 * @type function
 * @usage JSON.parse(object); | JSON.stringify(string);
 */
 if(!(window.JSON && window.JSON.parse)) {
   (function() {
    function g(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
    else if("function"==b&&"undefined"==typeof a.call)return"object";return b};function h(a){a=""+a;if(/^\s*$/.test(a)?0:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x10-\x1f\x80-\x9f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);}function i(a,b){var c=[];j(new k(b),a,c);return c.join("")}function k(a){this.a=a}
    function j(a,b,c){switch(typeof b){case "string":l(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case "boolean":c.push(b);break;case "undefined":c.push("null");break;case "object":if(null==b){c.push("null");break}if("array"==g(b)){var f=b.length;c.push("[");for(var d="",e=0;e<f;e++)c.push(d),d=b[e],j(a,a.a?a.a.call(b,""+e,d):d,c),d=",";c.push("]");break}c.push("{");f="";for(e in b)Object.prototype.hasOwnProperty.call(b,e)&&(d=b[e],"function"!=typeof d&&(c.push(f),l(e,c),c.push(":"),
      j(a,a.a?a.a.call(b,e,d):d,c),f=","));c.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof b);}}var m={'"':'\\"',"\\":"\\\\","/":"\\/","\u0008":"\\b","\u000c":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},n=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;
    function l(a,b){b.push('"',a.replace(n,function(a){if(a in m)return m[a];var b=a.charCodeAt(0),d="\\u";16>b?d+="000":256>b?d+="00":4096>b&&(d+="0");return m[a]=d+b.toString(16)}),'"')};window.JSON||(window.JSON={});"function"!==typeof window.JSON.stringify&&(window.JSON.stringify=i);"function"!==typeof window.JSON.parse&&(window.JSON.parse=h);
  })();
}


/*---------------------------------------------------------------------------*/
/*-- GLOBAL VARIABLES -------------------------------------------------------*/

/* user structure:
  - name : name chosen during login
  - life : [0, 100]. 100 (full life), 0 (dead)
  - robotN : associated robot ID
  - imgIndex : index of the selected image during login
  - date : login date
  - ready : 0 (not ready to fight), 1 (ready to fight)
*/
var user = {  name: "",
life: 100,
robotN: undefined,
imgIndex: 0,
date: "",
ready: 0,  };


var updateGameError = 0;  // keeps trace of the game errors (0 no error)
var played = false;       // signals whether user has played before or not
var prevGame = -1;        // signals if there has been a previous game

var userUpdate;           // ID of the setInterval on updateGameStatus()

/* define interval to update game status in ms */
const UPDATE_INTERVAL = 500;

/*---------------------------------------------------------------------------*/

/*
 * Delete user from users structure and localStorage
 * -----------------------
 *
 * @type function
 * @usage delUser(name_of_user_to_be_deleted);
 */
 function delUser(name){
  /* An ajax post request is sent to the server.
    request: delete user named "name".
    answer:
      - success : server answers with an error or with success
      - error : due to connection problems an error answer is received
      */
  $.ajax({
    url: '/signOutUser',
    data: {'data': name},
    type: 'POST',
    success: function(response) {
      /* response from server is parsed and status is get */
      var status = JSON.parse(response).status;

      /* status "OK" : user has been deleted from server */
      if ( status == "OK" ){
        /* Signal to the user that signOut had success */
        console.log("User \"" + user.name + "\" removed");
        swal("Your session has been deleted!", "Redirecting to login page", "success");
      }
      /* status "UNREGISTERED" : user is not registered */
      else if ( status == "UNREGISTERED" ){
        /* Signal to the user that is not logged */
        swal("Server error", "The user \"" + user.name + "\" is not logged.", "error");
      }
      /* status "FAILED" : for some reasons server can not remove it */
      else if ( status == "FAILED" ){
        /* Signal to the user that it is not logged in */
        swal("Server error", "The user \"" + user.name + "\" can't be removed.", "error");
        return;
      }
      else {
        /* Signal that there has been some error */
        swal("Unknown error", "response: " + response, "error");
        return;
      }

      /* Stop users list update */
      if ( typeof(userUpdate) != "undefined" ){
        window.clearInterval(userUpdate)
      }

      /* remove user from the localStorage */
      localStorage.removeItem('user');
      user.name = "";

      /* redirect to login page. Ready for a new login*/
      setTimeout(function(){
        location.href = "/";
      }, 1500);


    },
    /* errors due to connection problems */
    error: function (xhr, ajaxOptions, thrownError) {
      console.error("ERROR " + xhr.status + ": " + thrownError);
    }
  });
}


/*
 * SIGNOUT FUNCTION:
 *  call delUser if ok to signout
 * -----------------------
 *
 * @type function
 * @usage userSignOut();
 */
 function userSignOut() {
  /* Sign out confirm alert */
  swal({
    title: "Are you sure you want to Sign Out?",
    text: "Once deleted, you will not be able to recover this session",
    icon: "warning",
    buttons: true,
    dangerMode: true
  })
  .then(function(isConfirm) {
    if (isConfirm) {
      /* call delUser() (defined above) if signOut is confirmed */
      delUser(user.name);
    } else {
      swal("Your session is safe");
    }
  });

}

/*
 * LOGIN FUNCTION:
 *  get username from form and add user to python users
 * -----------------------
 *
 * @type function
 * @usage userLogin();
 */
 function userLogin() {
  /* Check if browser support local storage.
    localStorage is used to store info about user after login */
  if (typeof(Storage) !== "undefined") {

    /* Take username value from the "username" form field of the page */
    var tempName = document.getElementById('username').value;
    /* remove spaces before and after string */
    tempName = tempName.replace(/^\s+|\s+$/g, '');

    /* Check if username format is valid */
    if (tempName.match(/^[A-z0-9]+$/) == null || tempName.length > 16){
      swal({
        title: "Your username is not in a valid format!",
        text: "Username can not exceed 16 char length and can not "
        + "contain spaces and special characters.",
        icon: "warning",
      });
    }
    else {
      /* Here if username specified is correctly formatted */
      /* Tell python to add user to users list.
        A post request is sent to the server (data sent: username) */
      $.ajax({
        url: '/signUpUser',
        data: {'data':tempName},
        type: 'POST',
        dataType: "text",
        success: function(response) {
          /* Parse is performed from server answer */
          var res = JSON.parse(response);
          var status = res.status

          /* Server has registered the new user */
          if ( status == "OK" ){
            /* Save on the localStorage the user data */
            user.name = res.user;
            user.robotN = res.robot;
            user.date = (new Date()).toString().split("GMT")[0];
            localStorage.setItem('user', JSON.stringify(user));
            console.log("Logging in as: \"" + user.name + "\"");
            /* Redirect to home page - login successful*/
            location.href = "/home";
          }
          /* If no robots are available, login can not be done */
          else if ( status == "NO_ROBOTS" ){
            swal("Warning", "There are no robots available at the time!", "warning");
          }
          /* Robot that was associated to the user is not available */
          else if ( status == "ROBOT_UNAVAILABLE" ){
            swal("Server error", "The robot n. " + user.robotN + " is unavailable!", "error");
          }
          /* Username chosen is already used */
          else if ( status == "UNAVAILABLE" ){
            swal({
              title: "The username \"" + tempName + "\" is already taken!",
              text: "Please choose another one.",
              icon: "info",
            });
          }
          else {
            swal("Unknown error", "response: " + response, "error");
            return;
          }
        },
        /* communication errors */
        error: function (xhr, ajaxOptions, thrownError) {
          console.error("ERROR " + xhr.status + ": " + thrownError);
        }
      });

    }
  }
  else {
    /* Sorry! No Web Storage support... */
    swal({
      title: "This browser does not support local storage!",
      text: "The website can not work without local storage (Web storage)"
      + " support. This functionality will be added later on (maybe)",
      icon: "error",
    });
  }
}


/*
 * CHANGE USER AVATAR:
 *  increment imgIndex and cycles through avatars (6 static avatar images)
 * -----------------------
 *
 * @type function
 * @usage changeImage();
 */
 function changeImage() {
  /* each time a click on the avatar arises, this function is invoked.
    It changes the avatar to be associated to the user when login will be done */
  user.imgIndex = (user.imgIndex +1) % 5;
  document.getElementById("userImage").src = "static/img/avatar" + user.imgIndex +".png";
}

/*
 * MANAGE GAME STATUS:
 *  get updated users info and add updated html into proper location
 * -----------------------
 *
 * @type function
 * @usage updateGameStatus();
 */
 function updateGameStatus() {

  /* A post request to the server to obtain game status info */
  $.ajax({
    url: '/updateGameStatus',
    type: 'POST',
    data: {'data':'data'},
    /* server answer with status information
      Response from server has the following structure:
      - 'status'
      - 'users'
      - 'game'
      - 'timeLeft'
    */
    success: function(response) {
      /* response from server is parsed and status attribute is picked up */
      var status = JSON.parse(response).status

      /* if no error arised */
      if ( status == "OK" ){
        updateGameError = 0;

        var res = JSON.parse(response)

        /* assume my robot is disconnected */
        var robotDead = true;

        /* Taking the game status:
          0 - none game started
          1 - countdown - waiting for the game to start (allowing other users to join the game)
          2 - game on
        */
        var game = res.game;

        /* If user list is not empty */
        if (res.users !== "[]"){
          /* Inject in the page the received info from the server */

          /* clean html to be injected */
          var userList = "";
          var userLife = "";

          /* get all users info */
          var users = JSON.parse(res.users);
          var usersN = users.length;

          for (var i = 0; i < usersN; i++) {

            /* UPDATE USER STATUS */
            if (users[i].name != user.name){  // just show info related to other users
              userList += '<div class="user-list-div"><li><a>'
              /* user status icon */
              if (users[i].ready == 1){
                /* Users involved in a battle (ready = 1)*/
                if (users[i].life > 0 || game != 2)
                  /* */
                  userList += '<i class="fa fa-play-circle" style="color: #00a65a;"></i> '
                else
                  /* user is dead & game is not ended yet - X */
                  userList += '<i class="fa fa-times-circle" style="color: #d33724;"></i> '
              }
              /* users only logged in, not involved in a battle (ready = 0) */
              else
                userList += '<i class="fa fa-pause-circle" style="color: #f4bc42;"></i> '

              /* UPDATE USERNAME */
              userList += '<b> '+ users[i].name + '</b></a>'
              /* life percentage badge */
              + ' <span class="badge user-list-badge" >'
              + users[i].life + '%</span> </li>'

              /* UPDATE LIFEBAR */
              + ' <div class="progress progress-xs user-list-bar">'
              + ' <div class="progress-bar progress-bar-success" style="width: '
              + users[i].life + '%"></div></div></div><hr/>'
            }
            else{
              /* If I am in the list, the robot is not disconnected */
              user.life = users[i].life;
              user.ready = users[i].ready;
              robotDead = false;

            }
          }
          /* If no other players logged */
          if ( usersN < 2 )
            userList = '<div class="user-list-div"><li><a>No other users logged yet</a></div>';

          /* SHOW PERSONAL LIFEBAR */
          /* current user life percentage badge */
          userLife += '<div class="user-life-div">'
          + '<span class="badge user-life-badge">LIFE ' + user.life + '%</span>'
          /* current user life progress bar */
          + '<div class="progress user-life-bar">'
          + '<div class="progress-bar progress-bar-success" role="progressbar"'
          + 'aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: '
          + user.life + '%;"></div></div></div>';

          /* Append user list and user life to the page*/
          document.getElementById('userList').innerHTML = userList;
          document.getElementById('userLife').innerHTML = userLife;
        }
        /* check if robot is still connected */
        if (robotDead) {
          /* For some reasons robot has been disconnected */
          swal("OPS", "Connction to robot lost", "error");

          /* delete stored variables */
          localStorage.removeItem('user');
          user.name = "";

          /* redirect to login page */
          setTimeout(function(){
            location.href = "/";
          }, 1500);
        }

        /* change ready button color (ready = 1 - ready for the battle)*/
        var button = document.getElementById("ready-btn");
        if ( user.ready == 0 ) {
          button.style.backgroundColor = "#3c8dbc";
          button.innerHTML = '<i class="fa fa-play"></i> Ready';
        }
        else {
          button.style.backgroundColor = "#00a65a";
          button.innerHTML = 'Ready!';
        }

        /* Update only if:
          - previous status is different from the current one (something has to be updated)
          - game status is 1 (battle begin is waiting for countdown to finish)
            because countdown must be updated */
        if (prevGame != game || game != 2){
          /* current state becomes old state */
          prevGame = game;

          /* *** GAME STOPPED *** */
          if ( game == 0 ){
            /* re enable ready button */
            $('#ready-btn').prop('disabled', false);
            /* If first game of user */
            if (user.ready == 0 && !played ){
              /* User can begin the countdown to start the battle */
              document.getElementById('game-status').innerHTML = 'Press ready to start!';
            }
            /* *** GAME FINISHED *** */
            else if (played){
              /* battle is ended up. Since the user partecipated to it, ranking is
              shown and settings are restored to be ready for a new battle. */
              played = false;
              document.getElementById('game-status').innerHTML = 'Game over. Press ready to start again.'
              /* Battle is ended up. Disable events sensitivity */
              myGameArea.stop();
              /* Show ranking of the battle */
              var ranking = "Ranking:";
              var position = 1;

              /* First user is the winner */
              ranking += "\n 1 - " + users[0].name;

              for (var i = 1; i < usersN; i++) {
                /*This user was playing and is dead*/
                if(users[i].life == 0)
                  ranking += "\n" + (i+1) +" - " + users[i].name;

                /*This is my position*/
                if (users[i].name == user.name)
                  position = i+1;
              }
              /* Alert for battle end signaling arrival position*/
              /* game ending message */
              if (user.life > 0 && position == 1 ){
                /* WIN */
                swal("YOU WIN!", ranking);
              }
              else {
                /* LOST */
                swal("YOU LOST!\nYour arriving position is " + position, ranking);
              }

            }
            /* I am the only player ready */
            else {
              document.getElementById('game-status').innerHTML = 'Waiting for other players...'
            }
          }
          /* *** COUNTDOWN *** */
          else if ( game == 1 ){
            /* disable ready button since countdown is already started */
            if(user.ready == 1)
              $('#ready-btn').prop('disabled', true);
            /* print countdown into page
              res is a variable storing the server response (requested at each
              UPDATE_INTERVAL ms). This data is updated by the server.
            */
            document.getElementById('game-status').innerHTML = res.timeLeft + " sec to start."
          }
          /* *** GAME STARTED *** */
          else if ( game == 2 ){
            /* If user was ready */
            if ( user.ready ) {
              /* START */
              played = true; // to remind that user has played the battle
              myGameArea.start(); // set sensitive the keyUp and keyDown events
              document.getElementById('game-status').innerHTML = "PLAY!";
            }
            else{
              /* disable the ready button */
              $('#ready-btn').prop('disabled', true);
              document.getElementById('game-status').innerHTML = "The game is started without you";
            }
          }
        }

      }
      else {
        console.warn("response: " + response);
      }
    },
    /* Communication errors get here */
    error: function (xhr, ajaxOptions, thrownError) {
      console.error("ERROR " + xhr.status + ": " + thrownError);
      updateGameError ++;
      if (updateGameError > 5){
        swal("OPS", "Connction to webserver lost", "error");

        /* delete stored variables */
        localStorage.removeItem('user');
        user.name = "";

        /* redirect to login page */
        setTimeout(function(){
          location.href = "/";
        }, 1500);
      }
    }
  });

}


/*
 * UPDATE AVAILABLE ROBOT NUMBER:
 *  get number of available roborts add updated html into proper location
 * -----------------------
 *
 * @type function
 * @usage updateAvailableRobots();
 */
 function updateAvailableRobots() {
  /* post request to the server to receive how many Robots
    are connected to the application */
  $.ajax({
    url: '/getAvailableRobots',
    type: 'POST',
    data: {'data':''},
    success: function(response) {
      /* console.log("response: " + response); */
      var status = JSON.parse(response).status

      if ( status == "OK" ){
        /* if response was successful, write that info on the web*/
        document.getElementById('availableR').innerHTML = JSON.parse(response).availableR;
      }
      else {
        console.warn("response: " + response);
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.error("ERROR " + xhr.status + ": " + thrownError);
    }
  });

}


/*
 * UPDATE READY BUTTON:
 *  update ready status on button press
 * -----------------------
 *
 * @type function
 * @usage on click event call updateReady();
 */
 function updateReady() {
  /* Signal to the server through a post request that
   the user is ready to play */
  $.ajax({
    url: '/playerReady',
    type: 'POST',
    data: {'user': user.name, 'ready': user.ready==0 ? 1 : 0 },
    success: function(response) {

      var status = JSON.parse(response).status

      if ( status == "OK" ){
        /* OK answer from the server means that server has update
          on its own the sent information :
          button behaviour changed in updateGameStatus function */

      }
      else if ( status == "STARTED" ){
        swal("OPS", "The game is already started. Please wait for it to finish.", "info");
      }
      else {
        console.warn("response: " + response);
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.error("ERROR " + xhr.status + ": " + thrownError);
    }
  });

}


/*
 * HELP MESSAGE
 * -----------------------
 *
 * @type function
 * @usage help();
 */
 function help() {
  swal({
    title: "How to play LaserBot Battle",
    text: "Use arrow keys (or WASD) to move the robot.\n"
    + "Press enter or spacebar to fire laser.",
  });
}
