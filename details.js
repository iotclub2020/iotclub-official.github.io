var users;
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      if(user.displayName != null)
      window.location = 'dashboard.html';
      users = user;
    } else {
      // No user is signed in.
      window.location = 'index.html';
    }
  });

function saveDetails(){
  var name = document.getElementById('name').value;
  var reg = document.getElementById('reg').value;
  var ack = document.getElementById('ack');
    if(ack.checked){
      users.updateProfile({
        displayName: String(name)
      });
      var usersRef = firebase.database().ref('/users/'+ String(users.uid));
        usersRef.update({
          "name":name,
          "regno": reg,
          "events_history":[]
        });
        
        window.location = 'dashboard.html';
    }
    else{
        window.alert("Please check the box");
    }
}
