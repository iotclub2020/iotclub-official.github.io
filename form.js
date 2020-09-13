// Your web app's Firebase configuration
  var firebaseConfig = {
  apiKey: "AIzaSyAMBlgm_BBWWVEIRmMc1ddSbfza9SdgILI",
  authDomain: "iotclub-3b2cd.firebaseapp.com",
  databaseURL: "https://iotclub-3b2cd.firebaseio.com",
  projectId: "iotclub-3b2cd",
  storageBucket: "iotclub-3b2cd.appspot.com",
  messagingSenderId: "1031333943987",
  appId: "1:1031333943987:web:0b5ea748b9a1a6754deec6",
  measurementId: "G-ZHE2R9FRH1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
	const auth = firebase.auth();
	
	
	function signUp(){
		
		var email = document.getElementById("email");
		var password = document.getElementById("password");
		
		const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
		promise.catch(e => alert(e.message));
		
		alert("Signed Up");
	}
	
	
	
	function signIn(){
		
		var email = document.getElementById("email");
		var password = document.getElementById("password");
		
		const promise = auth.signInWithEmailAndPassword(email.value, password.value);
		promise.catch(e => alert(e.message));
		window.location = "LEADERBOARD.html"
		
		
		
	}
	
	
	function signOut(){
		
		auth.signOut();
		alert("Signed Out");
		
	}
	
	
	
	auth.onAuthStateChanged(function(user){
		
		if(user){
			
			var email = user.email;
			alert("Active User " + email);
			
			//Take user to a different or home page

			//is signed in
			
		}else{
			
			alert("No Active User");
			//no user is signed in
		}
		
		
		
	});
	

