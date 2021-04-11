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

// generate a unique id

const generateID = () =>
  Date.now().toString(Math.floor(Math.random() * 20) + 17);
  
const btnGenerate = document.getElementById('generateID');
const generateIDTXT = document.getElementById('generateidtxt');
const copy = document.getElementById('copy');

btnGenerate.addEventListener('click', () => {
  generateIDTXT.value = generateID();
});

