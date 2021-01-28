const admin = window.localStorage.getItem("admin");

if (admin!=null) {
    document.getElementById('createCard').style.display = "block";
    document.getElementById('joinCard').style.display = "none";
    document.getElementById('uname').innerText = "Welcome "+admin+" !";
}



function signIn(){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log(email,password);
    const path = email.substr(0,email.indexOf("@"));
    firebase.database().ref('/teamsAdmin/'+path).once('value').then(function (snap){
        if (snap.val() == null) {
            // $('#exampleModal').modal('hide');
            document.getElementById('errorAlert').className = "alert alert-warning alert-dismissible fade show";
        }
        else{
            window.localStorage.setItem("admin",path);
            window.location = "teams.html";
        }
    });
}

function signUp(){
    const email = document.getElementById('cemail').value;
    const password = document.getElementById('cpassword').value;
    const name = document.getElementById('cname').value;
    const path = email.substr(0,email.indexOf("@"));

    firebase.database().ref().child('teamsAdmin').child(path).set({
        name: name,
        email: email,
        password: password
    },function (error){
        if(error){
            window.alert('Account creation failed!  Retry after sometime');
        }
        else{
            window.localStorage.setItem("admin",path);
            window.location = "teams.html";
        }
    });
}

function create(){
    window.location = "login.html";
}

function createRoom(){
    const roomName = document.getElementById('roomName').value;
    const roomCode = document.getElementById('roomCode').value;
    firebase.database().ref().child('teamsAdmin').child(admin).child('rooms').once('value')
    .then(function (snap){
        if (snap.hasChild(roomCode)){
            window.alert('Room Code Already Taken!');
        }
        else{
            firebase.database().ref().child('teamsAdmin').child(admin).child('rooms/'+roomCode).set({
                name: roomName,
                allowReply: true
            },function(error){
                if(error){
                    window.alert('Room creation failed!  Retry after sometime');
                }
                else{
                    firebase.database().ref().child('rooms').child(roomCode).set({
                        name: roomName
                    },function(error){
                        if(error){
                            window.alert('Room creation failed!  Retry after sometime');
                        }
                        else{
                            window.alert('Room Created!');
                            window.localStorage.setItem("roomCode",roomCode);
                            window.localStorage.setItem("roomname",roomName);
                            window.location ="teamchat.html";
                        }
                    });

                }
            });
        }
    });
    
}


function joinRoom(){
    var roomid = document.getElementById('roomid').value;
    var teamname = document.getElementById('teamname').value.toLowerCase();
    firebase.database().ref('/rooms').once('value').then(function (snap){
        if (snap.hasChild(roomid)){
            window.localStorage.setItem("roomCode",String(roomid));
            window.localStorage.setItem("teamname",String(teamname));
            firebase.database().ref('/teams').once('value').then(function (snapshot){
                if (snapshot.hasChild(teamname)){
                    window.location = "teamchat.html";
                }
                else{
                    firebase.database().ref('/teams').child(teamname).set({
                        points: 0
                    },function (error){
                        if(error){
                            alert('Try joining room again');
                        }
                        else{
                            window.location = "teamchat.html";
                        }
                    });
                }
            });
        }
        else{
            alert("Room Doesn't Exist");
        }
    });
}
