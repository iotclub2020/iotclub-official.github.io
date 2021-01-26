var db = firebase.database().ref('/teams');

const teamName = window.localStorage.getItem("name");
const uid = window.localStorage.getItem("admin");

const post = document.getElementById('postMessage');
var ctrlholder = document.getElementById('controlholder');

var textarea = document.getElementById('messageArea');
var parent = document.getElementById('messageList');

const roomCode = window.localStorage.getItem('roomCode');
console.log(roomCode);
var adminRef = firebase.database().ref('teamsAdmin/'+uid+'/rooms/'+roomCode);

document.getElementById('uname').innerText = 'Welcome ' + uid + ' !';

function disableChat(){
    if(uid != null){
        post.style.visibility = "hidden";
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
        post.style.visibility = "visible";
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

function getMessage(){
    if (textarea.value != "")
        addMessage(textarea.value);
    textarea.value="";
}

function addMessage(replyText){

    var list = '<li style="margin-bottom: 20px;" class="list-group-item">'+
    '<div class="card bg-light mb-3">'+
    '<div class="card-header h5"><b>'+
    teamName +
    '</b>';

    if (uid != null){
        list += '<button class="pull-right btn btn-danger"><div class="row">'+
        '<div class="col" style="margin-right: -25px"><i class="material-icons">add</i></div>'+
        '<div class="col">Points</div>'+
        '</div></button>';
    }

    list += '</div><div class="card-body">'+
      '<p class="lead">'+
      replyText +
      '</p></div></div></li>';

    parent.innerHTML += list;
    scrollDown();

    
}

function scrollDown(){
    var elem = document.getElementById('messageCard');
    elem.scrollTop = elem.scrollHeight;
}

function keyEvent(event){
    var x = event.key;
    if (x == "Enter")
        getMessage();
    
}

