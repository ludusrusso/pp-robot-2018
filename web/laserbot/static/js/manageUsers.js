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
var currentUser = { 
                    name: "",
                    life: 100
                  };

function getUsers(){
  $.ajax({
    url: 'php/getUsers.php',
    type: 'POST',
    // blocking read
    async: false,
    success : function (response) {
      //console.log("read file: " + response);

      // Cut lines after \n
      var lines = response.match(/^.*((\r\n|\n|\r)|$)/gm);
      //console.log("logged users: " + lines);
      users = [];
      // Create array of user object

      if (lines[0] !==""){
        lines.forEach(function(entry) {
          users.push(JSON.parse(entry));
        });
      }
    }/*,
    error : //some code, 
    complete : function (response) {
      return JSON.parse(response);
    }*/
  });
}

function addUser(data){
  jsonString = JSON.stringify(data);
  $.ajax({
    url: 'php/addUser.php',
    type: 'POST',
    // blocking write
    async: false,
    data : {'jsonString':jsonString},
    dataType: "json"
  });
}

function isUserAvailable(avalname){
  getUsers();
  //no users logged
  if (users !== ""){
    for (var i = 0; i < users.length; i++) {
      if ( users[i].name == avalname ) {
        return false;
      }
    }
  }
  return true;
}


function delUser(){
  jsonString = JSON.stringify(currentUser);
  $.ajax({
    url: 'php/delUser.php',
    type: 'POST',
    // blocking write
    async: false,
    data : {'jsonString':jsonString},
    dataType: "json",
    success : function () {
      currentUser.name="";
    }
  });
}

function userLogin() {
  if (typeof(Storage) !== "undefined") {
    // Browser support local storage
    var tempName = document.getElementById('username').value;

    // remove spaces before and after string
    tempName = tempName.replace(/^\s+|\s+$/g, '')

    //Check if username is blank or already taken
    if (tempName.match(/^[A-z0-9]+$/) == null){
      alert("Your username is not in a valid format!\n"
            + "Username can not contain spaces and special characters.");
    } else if ( isUserAvailable(tempName) == true ){
      //LOGIN

      currentUser.name = tempName;

      localStorage.setItem('user', JSON.stringify(currentUser));
      // Add user to user list file
      addUser(currentUser);

      //Redirect to home page
      location.href = "home.html";
    } else {
      alert("The username \"" +tempName+ "\" is already taken! Choose another one.");
    }
  } else {
    // Sorry! No Web Storage support..
    alert("This browser does not support local storage!");
  }
}

// Spawn Green circle + username in id="userListId"
function updateLoggedUsers() {
  getUsers();
  var userList = "";

  if (users !== ""){
    for (var i = 0; i < users.length; i++) {
      if (users[i].name != currentUser.name){
        userList += '<li><a><i class="fa fa-circle text-success"></i> '
                  + users[i].name + '</a> <span class="badge bg-red" style="float: right" >'
                  + users[i].life + '%</span> </li>'
                  + ' <div class="progress progress-xs" style="width:97%"> '
                  + ' <div class="progress-bar progress-bar-primary" style="width: '
                  + users[i].life + '%"></div> </div><br />'
      }
    }
  } else {
    userList = "No users logget yet."
  }
  document.getElementById('userListId').innerHTML = userList;
}

//Signout Function
function userSignOut() {
  if (confirm('Are you sure you want to Sign Out?')) {
    // Yes
    localStorage.removeItem("user");
    console.log("User \""+ currentUser.name + "\" deleted.");
    delUser();
    location.href = "index.html";
  } else {
    // No
  }
}
