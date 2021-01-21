var users;
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      if(user.displayName != null)
      // window.location = 'dashboard.html';
      users = user;
    } else {
      // No user is signed in.
      // window.location = 'index.html';
    }
  });

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

function saveDetails(){
  var name = document.getElementById('name').value;
  var reg = document.getElementById('reg').value;
  var pass = document.getElementById('pass').value;
  var ack = document.getElementById('ack');
  var email = document.getElementById('email').value;
  var userId = email.substr(0,email.indexOf("@"));
  sha256(pass).then(function(value){
    if(ack.checked){
      firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        regno: reg,
        password: value
      },(error) => {
        if (error) {
          window.location = 'details.html';
        } else {
          window.location = 'dashboard.html';
        }
      });
      
    }
    else{
        window.alert("You need to be an IoT Member");
    }
  },function(error){
    window.location = 'details.html';
  });
    
}
