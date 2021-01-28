var accountsRef = firebase.database().ref('teamsAdmin');

function login() {
    const mail = document.getElementById('mail').value;
    const pass = document.getElementById('password').value;
    const path = mail.substr(0,mail.indexOf("@"));
    accountsRef.child(path).once('value').then(function (snap){
        var data = snap.val();
        if(data!=null){
            if (data.email == mail && pass == data.password){
                localStorage.setItem("admin",data.name);
                window.location = "";
            }
            else{
                alert('Account Details Incorrect!');
            }
        }
    });
}