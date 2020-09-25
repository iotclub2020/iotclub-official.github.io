function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  var u = firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function (){
    window.location = 'leaderboard.html';
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error : " + errorMessage);

  });

}

function logout(){
  firebase.auth().signOut();
}