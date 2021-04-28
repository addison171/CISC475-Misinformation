// content.js

Date.prototype.Format = function (fmt) { 
  var o = {
      "M+": this.getMonth() + 1, 
      "d+": this.getDate(), 
      "h+": this.getHours(), 
      "m+": this.getMinutes(), 
      "s+": this.getSeconds(), 
      "q+": Math.floor((this.getMonth() + 3) / 3), 
      "S": this.getMilliseconds() 
  };
  if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          return fmt;
}

document.getElementById("submit").addEventListener("click", function() {
    var uuid = $("#generateidtxt").val();
    var time = $("#clockDisplay").html();
    var host = $("#domainDisplay").html();
    var url = $("#urlDisplay").html();
    var title = $("#titleDisplay").html();
    var link = $("#link").val();


    var attitude = "";
    var a = document.getElementsByName("attitude");
    for (var i=0; i<a.length; i++) {
        if(a[i].checked){
          attitude = a[i].value;
        }
    }

    var learning = "";
    var a = document.getElementsByName("learning");
    for (var i=0; i<a.length; i++) {
        if(a[i].checked){
          learning = a[i].value;
        }
    }    

    if(uuid == "" || time == "" || host == "" || url == "" || title == "" || link == "" || attitude == "" || learning == "") {
        alert("uuid or time or host or url or title or link or attitude or learning is null");
        return;
    }

    var data = {"uuid": uuid, "time" : time,"host":host, "url":url, "title":title,"link":link,"attitude":attitude,"learning":learning};

    var XML = new XMLHttpRequest();
    XML.onreadystatechange = function () {
        if (XML.readyState == 4 && XML.status == 200) {
          var response_data = JSON.parse(XML.responseText);
          if(response_data["status"] == -1) {
              alert("save error");
              return;
  
          }else{
            alert("save ok");
          }
        }
    }
    XML.open('POST', 'http://localhost:3001/', true)
    XML.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //XML.send("uuid="+uuid+"&time="+time+"&host="+host+"&url="+url+"&title="+title+"&link="+link+"&attitude="+attitude+"&learning="+learning);
    XML.send(JSON.stringify(data))
});

function GetTime() {
  $(document).ready(function () {
      document.getElementById("clockDisplay").innerHTML = new Date().Format("yyyy-MM-dd hh:mm:ss");
  });
}

//Stuff for firebase
/*
chrome.runtime.onMessage.addListener((msg, sender, resp) => {
  if (msg.command == "post") {
    var data = msg.data;
    var classification = data.classification;
    var id = data.id;
    var leaning = data.leaning;
    console.log("HEREEEEE");

    try {
      var newPost = firebase.database().ref('sites/Hello').push.set({
        classification: classification,
        id: id,
        leaning: leaning
      })
    }
    finally {
      console.log("whatevs");
    }
  }
})
*/
function sendData(leaning, id, classification, website, date){
  chrome.runtime.sendMessage({command: "post", data: {classification: classification, leaning: leaning, id: id, website: website, date:date}},
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
      var url_obj = new URL(tab.url);
      var domain = url_obj.hostname;
      var title = tab.title;
      
      callback(url, domain, title);
    });
  }
  //---------------------------------------------------------------------
  //function to set id to show in the html
  function renderURL(url, domain, title) {
    document.getElementById('urlDisplay').textContent = url;
    document.getElementById('domainDisplay').textContent = domain;
    document.getElementById('titleDisplay').textContent = title;
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
    getCurrentTabUrl(function(url,domain, title) {
      renderURL(url,domain, title); 
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
  //sendData('conservative',generateIDTXT.value,'real', 'CNN');
});

const btnSubmit = document.getElementById('submit');

btnSubmit.addEventListener('click', () => {
  var website = document.getElementById('urlDisplay').textContent;
  console.log(website);
  //var regex = /[.$#/[]]/g;
  website = website.replace('.', '');
  console.log(website);
  sendData('conservative',generateIDTXT.value,'real', website, document.getElementById("clockDisplay").innerHTML);
});