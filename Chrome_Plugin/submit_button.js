// --------------------------------------------------------------------
// showing the top five websites visited today  

function documentpop(divName, data) {
    var popupDiv = document.getElementById(divName);
  
    var ul = document.createElement('ul');
    popupDiv.appendChild(ul);
  
    for (var i = 0, ie = data.length; i < ie; ++i) {
      var a = document.createElement('a');
      a.href = data[i];
      a.appendChild(document.createTextNode(data[i]));
      a.addEventListener('click', onclickfunction);
  
      var li = document.createElement('li');
      li.appendChild(a);
  
      ul.appendChild(li);
    }
  }

function onclickfunction(event) {
    chrome.tabs.create({
      selected: true,
      url: event.srcElement.href
    });
    return false;
  }
  
  
  // Search history to find up to five links that a user has typed in,
  
  function buildlist(divName) {
    var microsecondsPerDay = 1000 * 60 * 60 * 24 * 1;
    var onedayago = (new Date).getTime() - microsecondsPerDay;
  
  
    var numRequestsOutstanding = 0;
  
    chrome.history.search({
        'text': '',              // Return every history item....
        'startTime': onedayago  // that was accessed less than one week ago.
      },
      function(historyItems) {
        // For each history item, get details on all visits.
        for (var i = 0; i < historyItems.length; ++i) {
          var url = historyItems[i].url;
          var processVisitsWithUrl = function(url) {
            
            return function(visitItems) {
              processVisits(url, visitItems);
            };
          };
          chrome.history.getVisits({url: url}, processVisitsWithUrl(url));
          numRequestsOutstanding++;
        }
        if (!numRequestsOutstanding) {
          onAllVisitsProcessed();
        }
      });
  
  
    
    var urlToCount = {};
  

    var processVisits = function(url, visitItems) {
      for (var i = 0, ie = visitItems.length; i < ie; ++i) {
        // Ignore items unless the user typed the URL.
        if (visitItems[i].transition != 'typed') {
          continue;
        }
  
        if (!urlToCount[url]) {
          urlToCount[url] = 0;
        }
  
        urlToCount[url]++;
      }
  
    
      if (!--numRequestsOutstanding) {
        onAllVisitsProcessed();
      }
    };
  
    // This function is called when we have the final list of URls to display.
    var onAllVisitsProcessed = function() {
      // Get the top scorring urls.
      urlArray = [];
      for (var url in urlToCount) {
        urlArray.push(url);
      }
  
      // Sort the URLs by the number of times the user typed them.
      urlArray.sort(function(a, b) {
        return urlToCount[b] - urlToCount[a];
      });
  
      documentpop(divName, urlArray.slice(0, 5));
    };
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    buildlist("typedUrl_div");
  });
