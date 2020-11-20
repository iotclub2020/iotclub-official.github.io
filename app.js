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
  messageRef.on('value',function(snapshot)
  {
    let data=Object.values(snapshot.val());
    
    data.forEach(messages =>
      {
        $('#view_area').append(`
        <div class="box" class="view_area" id="view_area">
        <div class="face face1"><span>${messages.date}&nbsp;${messages.time}M</span></div>                            
        <div class="face face2"><span>${messages.name}</span></div>
        </div>
        `)
      }
      );
      data.forEach(messages =>
        {
          $('#button_cont').append(`
          <div class="button_cont" id="button_cont" align="center"><a class="example_e" href="${messages.link}" target="_blank" rel="nofollow noopener">Register now</a></div> <div class="para" id="para">
            </div>
          `)
        }
        );
  });
  