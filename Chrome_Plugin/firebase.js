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
  
  chrome.runtime.onMessage.addListener(
    function(msg, sender, resp){
      var check = 0;
      if(msg.command=="post"){
          var data = msg.data;
          var reason = data.reason; // added
          var classification = data.classification;
          var id = data.id;
          var leaning = data.leaning;
          var website = data.website;
          var date = data.date;
          try{
              var newPost = firebase.database().ref('sites/'+website +'/'+id).set({
                  Classification: classification,
                  Leaning:leaning,
                  Date:date,
                  Reason:reason 
              })
          }
          finally{
              console.log("whatevs");
          }

      }
      else if(msg.command=="query"){
        var data = msg.data;
        var site = data.site;
        var article = data.article;
        var userid = data.userid;
          //var ref = firebase.database().ref('sites/' + site + '/' + article + '/' + userid + '/Leaning');
          var ref = firebase.database().ref('sites/' + site + '/' + article);
          var lean;
          ref.get().then((snapshot) => {
            lean = snapshot.val();
            resp({data: lean});
            check = 1;
          }).catch((error) => {
            console.error(error);
          });
      }
      return true;
  })