/*! manageUsers.js */
/*
 * INCLUDE JSON PARSE AND STRINGIFY IF NOT PRESENT
 * -----------------------
 * 
 * @type function
 * @usage JSON.parse(object); | JSON.stringfy(string);
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

var users = [];
var username = "";
var robotN = 0;
var imgIndex = 0;

/* define interval to update user list in ms */
const UPDATE_INTERVAL = 1000;

/*---------------------------------------------------------------------------*/





/*
 * DELETE USER FROM USERS VAR IN PYTHON AND LOCALSTORAGE
 * -----------------------
 * 
 * @type function
 * @usage delUser(name_of_user_to_be_deleted);
 */
 function delUser(name){
  $.ajax({
    url: '/signOutUser',
    data: {'data': name},
    type: 'POST',
    success: function(response) {
      /* console.log("response: " + response); */
      var status = JSON.parse(response).status;

      if ( status == "OK" ){
        /* SIGN OUT */
        console.log("User \"" + username + "\" removed");
      }
      else if ( status == "UNREGISTERED" ){
        alert("SERVER: The user \"" + username + "\" is not logged.");
      }
      else if ( status == "FAILED" ){
        alert("SERVER: The user \"" + username + "\" can't be removed.");
        return;
      }
      else {
        console.warn("response: " + response);
        return;
      }

      localStorage.removeItem('user');
      localStorage.removeItem('imgIndex');
      username = "";
      location.href = "/";

    },
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
  if (confirm('Are you sure you want to Sign Out?')) {
    /* YES */
    delUser(username);
  }
  else {
    /* No */
  }
}


/*
 * LOGIN FUNCTION:
 *  get usernamename from form and add user to python users
 * -----------------------
 * 
 * @type function
 * @usage userLogin();
 */
 function userLogin() {
  /* Check if browser support local storage */
  if (typeof(Storage) !== "undefined") {

    var tempName = document.getElementById('username').value;
    /* remove spaces before and after string */
    tempName = tempName.replace(/^\s+|\s+$/g, '');

    /* Check if username format is valid */
    if (tempName.match(/^[A-z0-9]+$/) == null){
      alert("Your username is not in a valid format!\n"
        + "Username can not contain spaces and special characters.");
    }
    else {

      /* Tell python to  add user to users list */
      $.ajax({
        url: '/signUpUser',
        data: {'data':tempName},
        type: 'POST',
        dataType: "text",
        success: function(response) {
          /* console.log("response: " + response); */
          var status = JSON.parse(response).status
          username = JSON.parse(response).user;

          if ( status == "OK" ){
            /* LOGIN */
            console.log("Logging in as: \"" + username + "\"");
            localStorage.setItem('user', username);
            localStorage.setItem('imgIndex', imgIndex);

            /* Redirect to home page */
            location.href = "/home";
          }
          else {
            alert("The username \"" +username+ "\" is already taken! Choose another one.");
          }
        },
        error: function (xhr, ajaxOptions, thrownError) {
          console.error("ERROR " + xhr.status + ": " + thrownError);
        }
      });

    }
  }
  else {
    /* Sorry! No Web Storage support... */
    alert("This browser does not support local storage!");
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
  imgIndex = (imgIndex +1) % 6;
  document.getElementById("userImage").src = "static/img/avatar" + imgIndex +".png";
}


/*
 * UPDATE USER INFO (LIFE):
 *  get updated users info and add updated html into proper location
 * -----------------------
 * 
 * @type function
 * @usage updateLoggedUsers();
 */
 function updateLoggedUsers() {

  $.ajax({
    url: '/listUsers',
    type: 'POST',
    data: {'data':'data'},
    success: function(response) {
      /* console.log("response: " + response); */
      var status = JSON.parse(response).status

      if ( status == "OK" ){
        /* LIST USERS */
        /* console.log("Users : " + JSON.parse(response).users); */

        var userList = "";
        var userLife = "";

        if (JSON.parse(response).users !== "[]"){

          users = JSON.parse(JSON.parse(response).users);

          for (var i = 0; i < users.length; i++) {
            if (users[i].name != username){
              /* username */
              userList += '<br /><li><a><b>&emsp;'+ users[i].name + '</b></a>'
              /* life percentage badge */
              + ' <span class="badge" style="float: right; background-color:#3c8dbc;" >'
              + users[i].life + '%</span> </li><br />'
              /* life progress bar */
              + ' <div class="progress progress-xs" style="width:97%; background-color: #d33724">'
              + ' <div class="progress-bar progress-bar-success" style="width: '
              + users[i].life + '%"></div> </div>'
            }
            else{
              var currentUser = users[i];
            }
          }

          /* currentuser life percentage badge */
          userLife += '<div style="width: 500px; margin:0 auto;">'
          + '<span class="badge" style="position:relative; top:+1.5em; margin-left: 45%;'
          + ' background-color:transparent;" > LIFE ' + currentUser.life + '%</span>'
          /* current user life progress bar */
          + '<div class="progress progress" style="background-color: #d33724;">'
          + '<div class="progress-bar progress-bar-success" role="progressbar"'
          + 'aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: ' 
          + currentUser.life + '%;"></div></div></div>';

        }
        else {
          userList = "No users logget yet."
        }

        document.getElementById('userList').innerHTML = userList;
        document.getElementById('userLife').innerHTML = userLife;

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

