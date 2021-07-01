/*
This script runs in the background and logs the time a user spends on each tab in their browser by pinging the
tab and getting the URL and seeing it it has changed from the previous URL.
 */

self.importScripts('firebase/firebase-app.js', 'firebase/firebase-auth.js',
    'firebase/firebase-database.js', 'firebase/firebase-analytics.js');

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

var myVar = setInterval(tabTimer, 1000);
var timeOnPage = 0;
var active_url = ""
var userid;

const generateID = () =>
    Date.now().toString(Math.floor(Math.random() * 20) + 17);

function getDomain(url){ 
    let newURL = url.toString();
    arr = newURL.split('/');
    return arr[2];
}
//TODO: I am copying many of these functions from content.js but these kinds of shared items should be in some kind of util.js file
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

chrome.storage.sync.get('userid', function(items) {
    userid = items.userid;

    if(userid){
        console.log("UserId: " + userid);
    }
    else {
        userid = generateID();
        chrome.storage.sync.set({userid: userid}, function() {
            console.log(userid);
        });
    }
})

function sendData(id, website, timestamp, seconds) {
    firebase.database().ref('user_log/' + id + '/'+ timestamp).set({
            website: website,
            seconds: seconds
        },
        (response) => {
            console.log("sendData(): Data successfully sent to server; received response");
        });
}

function tabTimer () {
    /* TODO: A bug introduced in the latest chrome update results in:
        Unchecked runtime.lastError: Tabs cannot be queried right now (user may be dragging a tab).
        https://www.reddit.com/r/chrome_extensions/comments/no7igm/chrometabsonactivatedaddlistener_not_working/
     */

    /* TODO: This does not track when the tab does not have focus... so the time is incorrect if the user
        switched out of chrome.
     */

    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
      try {
            var url = tabs[0].url;
            const domain = getDomain(url);
            console.log(domain);
            if (active_url == "") {
                active_url = domain;
            } else if (active_url != domain && active_url != "") {
                console.log("previous active domain: " + active_url + ", " + timeOnPage + "s");
                sendData(userid, active_url, Date(), timeOnPage);
                timeOnPage = 0;
                active_url = domain;
            } else if (active_url == domain) {
                timeOnPage += 1;
            }
        } catch (e) {
          console.log("background.js, Error in query: " + e.message);
      }
    });
}