
function login(){

  var userEmail = document.getElementById("user_email").value;
  var userPass = document.getElementById("user_password").value;
  document.getElementById("btn-login").disabled = true;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function (){
    window.location = 'dashboard.html';
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("The user details is incorrect !");
    document.getElementById("btn-login").disabled = false;
  });

}

function logout(){
  firebase.auth().signOut();
  window.location = 'index.html';
}
