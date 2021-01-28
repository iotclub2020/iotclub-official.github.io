const uid = window.localStorage.getItem("admin");

var teamName = window.localStorage.getItem("teamname"); // Getting team name from cookies
var roomName = window.localStorage.getItem("roomname"); // Getting team name from cookies
if(teamName !=null){
    document.getElementById('teamname').innerText = "Team "+teamName.toUpperCase();
    document.getElementById('nameholder').innerText = teamName.toUpperCase();
}
else{
    teamName = uid;
}

// Updating team points 
if(uid == null){
    document.getElementById('roomdetails').style.display = "none";
    var teams = firebase.database().ref('/teams').child(teamName.toLowerCase()).on('value',function (snap){
        document.getElementById('pointsholder').innerText = snap.val().points;
    });
}

var post = document.getElementById('postMessage');
var ctrlholder = document.getElementById('controlholder');

var textarea = document.getElementById('messageArea');
var parent = document.getElementById('messageList');

const roomCode = window.localStorage.getItem("roomCode");
var roomsRef = null;
var adminRef = null;

// checking the validity of room code 
if (uid==null){
    
    if (roomCode == null || teamName == null){
        window.location = "teams.html"
    }
    else{
        var roomsRef = firebase.database().ref('/rooms/'+roomCode);
    }
}

if (uid!=null){
    var roomsRef = firebase.database().ref('/rooms/'+roomCode);
    document.getElementById('roomCode').innerText = roomCode;
    document.getElementById('roomName').innerText = roomName;
    document.getElementById('teaminfo').style.display = "none";
}

// In the case of room admin 
if (uid!=null){
    adminRef = firebase.database().ref('teamsAdmin/'+uid+'/rooms/'+roomCode);
    adminRef.on('value',function (snap){
        var reply = snap.val().allowReply;
        // if(!reply){
        //     post.style.display = "none";
        // }
    });
}
else{
    document.getElementById('disable').style.visibility = "hidden";
}
if(uid == null){
    document.getElementById('uname').innerText = 'Welcome Team ' + teamName.toUpperCase() + ' !';
}else{
    document.getElementById('uname').innerText = 'Welcome ' + uid.toUpperCase() + ' !';
}


// Only visible for admin
function disableChat(){
    if(uid != null){
        // post.style.visibility = "hidden";
        adminRef.update({
            allowReply: false
        },function(error){
            if(error){
                
            }
            else{
                ctrlholder.innerHTML = '<button class="btn btn-success pull-right" onclick="enableChat()">Enable Chat</button>';
            }
        });
        
    }
}

function enableChat(){
    if(uid != null){
        // post.style.visibility = "visible";
        adminRef.update({
            allowReply: true
        },function(error){
            if(error){
                
            }
            else{
                ctrlholder.innerHTML = '<button class="btn btn-danger pull-right" onclick="disableChat()">Stop Chat</button>';
            }
        });
        
    }
}

// message added event listener
if(roomsRef != null){
    roomsRef.child('messages').on('child_added', function (snap,prev){
        var pulledData = snap.val();
        if (pulledData.name != teamName)
            displayMessage(pulledData.name,pulledData.message);
    });
}

// gets message from user
function getMessage(){
    if (textarea.value != "")
        addMessage(textarea.value);
    textarea.value="";
}

// display message to user from database
function displayMessage(name,message){
    var list = '<li style="margin-bottom: 20px;" class="list-group-item">'+
    '<div class="card bg-light mb-3">'+
    '<div class="card-header h5"><b>'+
    name +
    '</b>';

    if (uid != null){
        list += '<button class="pull-right btn btn-danger" onclick="addPoints(this)"><div class="row">'+
        '<div class="col" style="margin-right: -25px"><i class="material-icons">add</i></div>'+
        '<div class="col">Points</div>'+
        '</div></button>';
    }

    list += '</div><div class="card-body">'+
      '<p class="lead">'+
      message +
      '</p></div></div></li>';
      
    parent.innerHTML += list;
    scrollDown();
}

// add message to database and web page
function addMessage(replyText){

    var list = '<li style="margin-bottom: 20px;" class="list-group-item">'+
    '<div class="card bg-success text-white mb-3">'+
    '<div class="card-header h5"><b>'+
    teamName +
    '</b>';
    

    if (uid != null){
        list += '<button class="pull-right btn btn-danger" onclick="addPoints(this)"><div class="row">'+
        '<div class="col" style="margin-right: -25px"><i class="material-icons">add</i></div>'+
        '<div class="col">Points</div>'+
        '</div></button>';
    }

    list += '</div><div class="card-body">'+
      '<p class="lead text-white">'+
      replyText +
      '</p></div></div></li>';

    if(uid != null){
        roomsRef.child('messages').push().set({
            name:uid,
            message: replyText
        },function (error){
            if (error){
                alert('Message not sent');
            }
            else{
                parent.innerHTML += list;
                scrollDown();
            }
        });
    }
    else{
        roomsRef.child('messages').push().set({
            name:teamName,
            message: replyText
        },function (error){
            if (error){
                alert('Message not sent');
            }
            else{
                parent.innerHTML += list;
                scrollDown();
            }
        });
    }
    
}

// scroll down when new message added
function scrollDown(){
    var elem = document.getElementById('messageCard');
    elem.scrollTop = elem.scrollHeight;
}

// Enter key to sent
function keyEvent(event){
    var x = event.key;
    if (x == "Enter")
        getMessage();
    
}

// Exit from room
function exitRoom() {
    localStorage.removeItem("teamname");
    localStorage.removeItem("roomCode");
    window.location = "teams.html";
}

function addPoints(params) {
    var nodeValue = params.previousElementSibling.textContent;
    var prevPoints;
    firebase.database().ref('/teams').child(nodeValue.toLowerCase()).once('value')
    .then(function (snap){
        if (snap.val() == null){
            alert('Team does not exist!');
        }
        else{
            prevPoints = snap.val().points;
            firebase.database().ref('/teams').child(nodeValue.toLowerCase()).update({
                points:prevPoints+5
            },function (error){
                if (error){
                    alert('Points not added');
                }
                else{
                    params.innerHTML = '<div class="row">'+
                    '<div class="col" style="margin-right: -25px"><i class="material-icons">done</i></div>'+
                    '<div class="col">Added</div>'+
                    '</div>';
                    params.className = "pull-right btn btn-light";
                }
            });
        }
    });
}

