var db = firebase.database().ref('/teams');
window.localStorage.setItem("name","Team Sankar");
window.localStorage.setItem("uid","8547");
const teamName = window.localStorage.getItem("name");
const uid = window.localStorage.getItem("uid");
function getMessage(){
    var textarea = document.getElementById('messageArea');
    if (textarea.value != "")
        addMessage(textarea.value);
    textarea.value="";
}

function addMessage(replyText){
    // var teamName = "Scriptons";
    // var replyText = "Answer from team here";
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

    var parent = document.getElementById('messageList');
    parent.innerHTML += list;
    // console.log(parent);
    
}
console.log(window.localStorage.getItem("uid"));
// addMessage();