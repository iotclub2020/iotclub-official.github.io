var firebaseConfig = {
  apiKey: "AIzaSyAMBlgm_BBWWVEIRmMc1ddSbfza9SdgILI",
  authDomain: "iotclub-3b2cd.firebaseapp.com",
  databaseURL: "https://iotclub-3b2cd.firebaseio.com",
  projectId: "iotclub-3b2cd",
  storageBucket: "iotclub-3b2cd.appspot.com",
  messagingSenderId: "1031333943987",
  appId: "1:1031333943987:web:43f55129846f1a754deec6",
  measurementId: "G-82LG5CXE52"
};

firebase.initializeApp(firebaseConfig);


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
