// content.js
function GetTime() {
    $(document).ready(function () {
        document.getElementById("clockDisplay").innerHTML = Date();
    });
}



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
  
  function renderURL(statusText) {
    document.getElementById('urlDisplay').textContent = statusText;
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    getCurrentTabUrl(function(url) {
      renderURL(url); 
    });
  });

$(document).ready(function() {
    GetTime();
    setInterval( GetTime, 1000 );
});

