// console.log(firebase);
const auth = firebase.auth();
const eventref = firebase.database().ref('/events');
var userID;

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
        userID = String(user.uid);
        const userref = firebase.database().ref('/users/' + String(auth.currentUser.uid));
        userref.once('value', function (snapshot){
            eventsArr = snapshot.val();
            document.getElementById('tot_events').innerHTML = eventsArr.eventsRegistered.length;
            document.getElementById('event_score').innerHTML = eventsArr.points;
        });
        // console.log(userID);
        // checkRegistration(userID);
      if(user.displayName == null)
        window.location = 'details.html';
      document.getElementById('uname').innerText='Welcome '+ String(user.displayName) + ' !';
    } else {
      // No user is signed in.
      window.location = 'index.html';
    }
});


eventref.once('value', function(snapshot){
    d = snapshot.val();
    var nodeFinal = '';
    for (x in d) {
        var node = '<div class="col-md-6 d-flex justify-content-center">'+
    '<div class="wow fadeInUp" data-wow-duration=".3" data-wow-delay=".1s">'+
        '<div class="s-plan-v1 g-text-center--xs g-bg-color--white g-padding-y-100--xs">'+
            '<h3 class="g-font-size-40--xs g-font-size-50--sm g-font-size-60--md">'+
            d[x].name + '</h3>'+
            '<h3 class="g-font-size-18--xs" >'+
            d[x].description + '</h3>'+
            '<h3 class="g-font-size-18--xs"><b>Date: </b>'+
            d[x].date + '</h3>'+
            '<button id="regbtn" class="btn text-uppercase g-font-size-20--xs g-font-weight--700 g-color--primary g-letter-spacing--2 g-margin-b-25--xs" onclick="enroll(this)">Register Me</button>'+
        '</div></div></div>';
        nodeFinal += node;
        
    }
    document.getElementById('events-div').innerHTML = nodeFinal;
});



function enroll(params) {

    var uid = auth.currentUser.uid;
    const userRef = firebase.database().ref('/users/' + String(uid));
    
    var eventName = params.previousSibling.previousSibling.previousSibling.innerText;
    var eventsArr;

    userRef.once('value', function (snapshot){
        eventsArr = snapshot.val();
        document.getElementById('tot_events').innerHTML = eventsArr.eventsRegistered.length;
        console.log(eventsArr.eventsRegistered.length);
        if (eventsArr == null) {
            eventsArr = new Array(eventName);
            userRef.set({
                "eventsRegistered":eventsArr
            });
            params.disabled = true;
        }
        else{
            for (let i = 0; i < eventsArr.eventsRegistered.length; i++) {
                if(eventsArr.eventsRegistered[i] == eventName){
                    window.alert("Already Registered!");
                    return ;
                }
            }
            eventsArr = eventsArr.eventsRegistered;
            eventsArr.push(eventName);
            userRef.update({
                "eventsRegistered": eventsArr
            });
        
        }
    });
}