console.log("ribbon.js is active");
document.onload = initializeFirebase();
console.log('firebase initialized (?)');
document.head.onload = dropDownRibbon();
console.log('dropdown ribbon initialized');


// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyCQsWrA1_zCAukNqv3qOUBYXY7KBudFRjQ",
  authDomain: "cisc475database.firebaseapp.com",
  databaseURL: "https://cisc475database-default-rtdb.firebaseio.com",
  projectId: "cisc475database",
  storageBucket: "cisc475database.appspot.com",
  messagingSenderId: "372963635946",
  appId: "1:372963635946:web:7ed6c09fce9f9bff8d1d93",
  measurementId: "G-JZ5HT65P6V"
};


firebase.initializeApp(firebaseConfig);

  var ref = firebase.database().ref();

  /*ref.on("value", function(snapshot) {
     console.log(snapshot.val());
  }, function (error) {
     console.log("what is below?")
     console.log("Error: " + error.code);
  });*/

function initializeFirebase(){
  let scriptA = document.createElement('script');
  let scriptB = document.createElement('script');

  scriptA.src = "https://www.gstatic.com/firebasejs/4.1.3/firebase.js"
  scriptB.src = "https://www.gstatic.com/firebasejs/4.1.3/firebase-auth.js"
}

function dropDownRibbon(){
  let rbnDiv = document.createElement('div')
  let style = document.createElement('style')
 
  style.textContent = '#rbnDiv{background-color:green; display:block; height:50px;}'
  rbnDiv.id='rbnDiv'
  rbnDiv.textContent = 'hello'
  document.body.insertBefore(rbnDiv, document.body.firstChild)
  document.body.insertBefore(style, document.body.firstChild)
}