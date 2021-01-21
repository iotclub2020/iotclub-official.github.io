async function sha256(message) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);                    

  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string                  
  const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');

  return hashHex;
}

function login(){

  var userEmail = document.getElementById("user_email").value;
  var userPass = document.getElementById("user_password").value;
  document.getElementById("btn-login").disabled = true;
  firebase.database().ref('users/' + userEmail.substr(0,userEmail.indexOf("@"))).on('value', (snapshot) => {
    const data = snapshot.val();
    if (data != null){
      if(data.email == userEmail){
        sha256(userPass).then(function (value){
          if (value == data.password){
            console.log("Success");
            window.localStorage.setItem("name", data.username);
            window.location = 'dashboard.html';
          }
          else{
            console.log("Failed");
          }
        })
      }
    }
    else{
      window.location = 'index.html';
    }
  });

}


function logout(){
  firebase.auth().signOut();
  window.location = 'index.html';
}