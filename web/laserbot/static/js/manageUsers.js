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

var users = [];

var username = "";
var robotN = 0;

var imgIndex = 0;

function addUser(data){
  $.ajax({
    url: '/signUpUser',
    data: {'data':data},
    type: 'POST',
    success: function(response) {
      //console.log("response: " + response);
      var status = JSON.parse(response).status
      username = JSON.parse(response).user;

      if ( status == "OK" ){
        //LOGIN
        console.log("Logging in as: \"" + username + "\"");
        localStorage.setItem('user', username);
        localStorage.setItem('imgIndex', imgIndex);

        //Redirect to home page*/
        location.href = "/home";
      } else if ( status == "UNAVAILABLE" ){
        alert("The username \"" +username+ "\" is already taken! Choose another one.");
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

function delUser(data){
  $.ajax({
    url: '/signOutUser',
    data: {'data':data},
    type: 'POST',
    success: function(response) {
      //console.log("response: " + response);
      var status = JSON.parse(response).status

      if ( status == "OK" ){
        //SIGN OUT
        console.log("User \"" + username + "\" removed");
        localStorage.removeItem('username');
        localStorage.removeItem('imgIndex');
        username = "";
        location.href = "/";

      } else if ( status == "UNREGISTERED" ){
        alert("SERVER: The user \"" +username+ "\" is not logged.");
        location.href = "/";
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

//Signout Function
function userSignOut() {
  if (confirm('Are you sure you want to Sign Out?')) {
    // YES
    delUser(username);
  } else {
    // No
  }
}

function getUsers(){
  $.ajax({
    url: '/listUsers',
    type: 'POST',
    data: {'data':'data'},
    success: function(response) {
      //console.log("response: " + response);
      var status = JSON.parse(response).status

      if ( status == "OK" ){
        //LIST USERS
        users = JSON.parse(response).users
        console.log("Users : " + JSON.stringify(users));
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

function userLogin() {
  if (typeof(Storage) !== "undefined") {
    // Browser support local storage
    var tempName = document.getElementById('username').value;

    // remove spaces before and after string
    tempName = tempName.replace(/^\s+|\s+$/g, '');

    //Check if username is blank or already taken
    if (tempName.match(/^[A-z0-9]+$/) == null){
      alert("Your username is not in a valid format!\n"
        + "Username can not contain spaces and special characters.");
    } else {

      // Add user to user list file
      $.ajax({
        url: '/signUpUser',
        data: {'data':tempName},
        type: 'POST',
        dataType: "text",
        success: function(response) {
          //console.log("response: " + response);
          var status = JSON.parse(response).status
          username = JSON.parse(response).user;

          if ( status == "OK" ){
            //LOGIN
            console.log("Logging in as: \"" + username + "\"");
            localStorage.setItem('user', username);
            localStorage.setItem('imgIndex', imgIndex);

            //Redirect to home page*/
            location.href = "/home";
          } else {
            alert("The username \"" +username+ "\" is already taken! Choose another one.");
          }
        },
        error: function (xhr, ajaxOptions, thrownError) {
          console.error("ERROR " + xhr.status + ": " + thrownError);
        }
      });

    }
  } else {
    // Sorry! No Web Storage support..
    alert("This browser does not support local storage!");
  }
}


function changeImage() {
  imgIndex = (imgIndex +1) % 6;
  document.getElementById("userImage").src = "static/img/avatar" + imgIndex +".png";
}


// Spawn Green circle + username in id="userListId"
function updateLoggedUsers() {

  $.ajax({
    url: '/listUsers',
    type: 'POST',
    data: {'data':'data'},
    success: function(response) {
      //console.log("response: " + response);
      var status = JSON.parse(response).status

      if ( status == "OK" ){
        //LIST USERS
        //console.log("Users : " + JSON.parse(response).users);

        var userList = "";
        var userLife = "";

        if (JSON.parse(response).users !== "[]"){
          users = JSON.parse(JSON.parse(response).users);
          for (var i = 0; i < users.length; i++) {
            if (users[i].name != username){
              //circle + username
              userList += '<br /><li><a><b>&emsp;'+ users[i].name + '</b></a>'
              // 
              + ' <span class="badge" style="float: right; background-color:#3c8dbc;" >'
              + users[i].life + '%</span> </li><br />'
              + ' <div class="progress progress-xs" style="width:97%; background-color: #d33724"> '
              + ' <div class="progress-bar progress-bar-success" style="width: '
              + users[i].life + '%"></div> </div>'
            }
            else{
              var currentUser = users[i];
            }
          }

          userLife += '<div style="width: 500px; margin:0 auto;">'
          + '<span class="badge" style="position:relative; top:+1.5em; margin-left: 45%;'
          + ' background-color:transparent;" > LIFE ' + currentUser.life + '%</span>'
          + '<div class="progress progress" style="background-color: #d33724;">'
          + '<div class="progress-bar progress-bar-success" role="progressbar"'
          + 'aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: ' 
          + currentUser.life + '%;"></div></div></div>';

        } else {
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

