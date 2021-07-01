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
                    firebase.analytics();

                var  id, time, url, domain, link;

                function Ready(){
                    id = document.getElementById("generateidtxt").value;
                    time = document.getElementById("clockDisplay").value;
                    url = document.getElementById("urlDisplay").value;
                    domain = document.getElementById("domainDisplay").value;
                    link = document.getElementById("link").value;
                }

                document.getElementById('submit').onclick = function(){
                    Ready();
                    firebase.database().ref('USER/'+ url).set({
                        ID: id,
                        TIME: time,
                        URL: url,
                        DOMAIN: domain,
                        LINK: link
                        });
                }