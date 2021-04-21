// content.js
function GetTime() {
  $(document).ready(function () {
      document.getElementById("clockDisplay").innerHTML = Date();
  });
}

//Stuff for firebase
chrome.runtime.onMessage.addListener((msg, sender, resp) => {
  if (msg.command == "post") {
    var data = msg.data;
    var classification = data.classification;
    var id = data.id;
    var website = data.website;
    console.log("HEREEEEE");

    try {
      var newPost = firebase.database().ref('sites').push.set({
        classification: classification,
        id: id,
        website: website
      })
    }
    finally {
      console.log("whatevs");
    }
  }
})
function sendData(website, id, classification){
  chrome.runtime.sendMessage({command: "post", data: {classification: classification, website: website, id: id}},
  (response) => {
      console.log("hi");
  });
}



// content.js
function GetTime() {
  $(document).ready(function () {
      document.getElementById("clockDisplay").innerHTML = Date();
  });
}

//function to get Current URL
function getCurrentTabUrl(callback) {  
    var queryInfo = {
      active: true, 
      currentWindow: true
    };
  
    chrome.tabs.query(queryInfo, function(tabs) {
      var tab = tabs[0]; 
      var url = tab.url;
      callback(url);
    });
  }
  //---------------------------------------------------------------------
  //function to set id to show in the html
  function renderURL(statusText) {
    document.getElementById('urlDisplay').textContent = statusText;
  }
  function renderdomain(statusText) {
    document.getElementById('domainDisplay').textContent = statusText;
  }


  //function to set id to show in the html
  function getCurrentTabdomain(callback){
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var tab = tabs[0];
      var url = new URL(tab.url);
      var domain = url.hostname;
      callback(domain);
      // `domain` now has a value like 'example.com'
    });
  }
  //------------------------------------------------------------------------
  /*
  document.addEventListener('DOMContentLoaded', function() {
    getCurrentTabUrl(function(url) {
      renderURL(url); 
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    getCurrentTabdomain(function(domain) {
      renderdomain(domain); 
    });
  });
  
  //--------------------------------------------------------

$(document).ready(function() {
    GetTime();
    setInterval( GetTime, 1000 );
});
*/
// generate a unique id

const generateID = () =>
  Date.now().toString(Math.floor(Math.random() * 20) + 17);
  
const btnGenerate = document.getElementById('generateID');
const generateIDTXT = document.getElementById('generateidtxt');
const copy = document.getElementById('copy');

btnGenerate.addEventListener('click', () => {
  generateIDTXT.value = generateID();
});

const btnSubmit = document.getElementById('')

