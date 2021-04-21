
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  chrome.runtime.onMessage.addListener((msg, sender, resp) => {
      if(msg.command=="post"){
          var data = msg.data;
          var classification = data.classification;
          var id = data.id;
          var website = data.website;

          try{
              var newPost = firebase.database().ref('table').push.set({
                  classification: classification,
                  id: id,
                  website = website
              })
          }
          finally{
              console.log("whatevs");
          }
      }
  })
