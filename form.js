
var firebaseConfig = {
    apiKey: "AIzaSyCnFw8pA6uGPtFd9rY71atIsUCoX8uHtsk",
    authDomain: "iot-events-3d614.firebaseapp.com",
    databaseURL: "https://iot-events-3d614.firebaseio.com",
    projectId: "iot-events-3d614",
    storageBucket: "iot-events-3d614.appspot.com",
    messagingSenderId: "297259063119",
    appId: "1:297259063119:web:5dcd762088e2dd528c173a",
    measurementId: "G-RX44V05JWR"
  };


  firebase.initializeApp(firebaseConfig);
  var messageRef = firebase.database().ref('message');
document.getElementById('eventForm').addEventListener('submit',submitForm);

function submitForm(e)
{
    e.preventDefault();
    var name=getInputVal('name');
    var image=getInputVal('image');
    var link=getInputVal('link');
    var date=getInputVal('date');
    var time=getInputVal('time');
    var desc=getInputVal('description');
    
    saveMessage(name,image,date,time,description,link);

}

function getInputVal(id)
{
    return document.getElementById(id).value;
}
function saveMessage(name,image,date,time,description,link)
{
    var newMessageRef = messageRef.push();
    newMessageRef.set({
        name: name,
        image: image,
        date: date,
        time: time,
        link: link,
        description:description

    });
}