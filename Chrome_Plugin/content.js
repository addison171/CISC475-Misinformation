// content.js

var realURL; 


chrome.storage.sync.get('userid', function(items) {
  var userid = items.userid;
  if(userid){
    console.log(userid);
  }
  else {
      userid = generateID();
      chrome.storage.sync.set({userid: userid}, function() {
        console.log(userid);
      });
    }
    generateIDTXT.value = userid;
  })

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
    //var url = $("#urlDisplay").html();
    var title = $("#titleDisplay").html();
    var link = $("#link").val();
    var Reason = $("#Reason").val();
    var realURL;
    var url = getCurrentTabUrl(function(url,domain, title) {
      realURL = url;
    });
    var url = realURL;
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

    var articlelabel = "";
    var a = document.getElementsByName("articlelabel");
    for (var i=0; i<a.length; i++) {
        if(a[i].checked){
          articlelabel = a[i].value;
        }
    }    
// Added ---------------------------
    var reasoning = "";
    var a = document.getElementsByName("reasoning");
    for (var i=0; i<a.length; i++) {
      if(a[i].checked){
        articlelabel = a[i].value;
      }
    }
//-------------------------------------
    if(uuid == "" || time == "" || host == "" || url == "" 
        || title == "" || link == "" || attitude == "" 
        || learning == "" || Reason == "" || articlelabel == "") {
        alert("uuid or time or host or url or title or link or attitude or learning is null");
        // return;
    }

    var data = {"uuid": uuid, "time" : time,"host":host, "url":url, 
        "title":title,"link":link,"attitude":attitude,
        "learning":learning, "Reason":Reason, "articlelabel":articlelabel};

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
    return true;
});

function GetTime() {
  $(document).ready(function () {
      document.getElementById("clockDisplay").innerHTML = new Date().Format("yyyy-MM-dd hh:mm:ss");
  });
}

function sendData(leaning, id, classification, website, date, reason){ 
  chrome.runtime.sendMessage({command: "post", data: {classification: classification, leaning: leaning, id: id, website: website, date:date, reason: reason}},
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
  function renderURL(url, domain, title , attitude, learning, count, allcount, articlelabel) {
    console.log("renderURL: "+ url);
    $(document).ready(function () {
      document.getElementById("urlDisplay").innerHTML = url;
  });
    document.getElementById('urlDisplay').innerHTML = url;
    document.getElementById('urlDisplay').textContent = url;

    document.getElementById('domainDisplay').textContent = domain;
    document.getElementById('titleDisplay').textContent = title;

    if(attitude == "" || attitude == null) {

        document.getElementById('kownDisplay').textContent = "unknown website"
        document.getElementById('kownacticleDisplay').textContent = "unknown website"

    } else {
       // already vistor
       document.getElementById('kownDisplay').textContent = ((count/allcount) * 100) + "% of our users who visit this site have labeled this site as " + attitude
       document.getElementById('kownDisplay').style="font-weight: bold"

       document.getElementById('kownacticleDisplay').textContent = ((count/allcount) * 100) + "% of our users who visit this site have labeled this site as " + attitude + ", acticle as " + articlelabel
       document.getElementById('kownacticleDisplay').style="font-weight: bold"


       var a = document.getElementsByName("attitude");
       for (var i=0; i<a.length; i++) {
           if(a[i].value == attitude){
             a[i].checked = "true";
           }
       }
   
       var a = document.getElementsByName("learning");
       for (var i=0; i<a.length; i++) {
           console.log(a[i].value);
           console.log(learning);
           if(a[i].value == learning){
             
             a[i].checked = "true";
           }
       }   

       var a = document.getElementsByName("articlelabel");
       for (var i=0; i<a.length; i++) {
           console.log(a[i].value);
           console.log(learning);
           if(a[i].value == articlelabel){
             
             a[i].checked = "true";
           }
       }         

    }


  }
  

  document.addEventListener('DOMContentLoaded', function() {
    getCurrentTabUrl(function(url,domain, title) {
      console.log("YES I AM HERE");
      console.log(url);
      realURL = url;
      $(document).ready(function () {
        document.getElementById("urlDisplay").innerHTML = url;
      });
      $(document).ready(function () {
        document.getElementById("domainDisplay").innerHTML = domain;
      });
      $(document).ready(function () {
        document.getElementById("titleDisplay").innerHTML = title;
      });

      var XML = new XMLHttpRequest();
      XML.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          console.log("AND HEREEEEEEEE");
          
        var response_data = JSON.parse(XML.responseText);
          
          var attitude = "";
          var learning = "";
          if(response_data["status"] == 0) {
              attitude = response_data["attitude"]
              learning = response_data["learning"]
              count = response_data["count"]
              allcount = response_data["allcount"]
              articlelabel = response_data["articlelabel"]
          }
          console.log("Prerend: " + URL);
          renderURL(url,domain, title, attitude, learning, count, allcount, articlelabel);
        } 
      }
      console.log(url);
      XML.open('GET', 'http://localhost:3001/api/v1/hostinfo?host='+domain, true)
      //XML.send("uuid="+uuid+"&time="+time+"&host="+host+"&url="+url+"&title="+title+"&link="+link+"&attitude="+attitude+"&learning="+learning);
      XML.send() 
  
      
       
    });
    return true;
  });

  
  //--------------------------------------------------------

$(document).ready(function() {
    GetTime();
    //renderURL();
    setInterval( GetTime, 1000 );
});

const generateID = () =>
  Date.now().toString(Math.floor(Math.random() * 20) + 17);

const btnGenerate = document.getElementById('generateID');
const generateIDTXT = document.getElementById('generateidtxt');
const copy = document.getElementById('copy');

btnGenerate.addEventListener('click', () => {
  chrome.storage.sync.get('userid', function(items) {
    var userid = items.userid;
    if(userid){
      console.log(userid);
    }
    else {
        userid = generateID();
        chrome.storage.sync.set({userid: userid}, function() {
          console.log(userid);
        });
      }
      generateIDTXT.value = userid;
    })
    return true;
});

const btnSubmit = document.getElementById('submit');

document.getElementById("search").addEventListener("click", function() {

  var start_time = document.getElementById("start_time").value + " 00:00:00";
  var end_time = document.getElementById("end_time").value + " 23:59:59";
  var XML = new XMLHttpRequest();
  XML.onreadystatechange = function () {
      if (XML.readyState == 4 && XML.status == 200) {
    
        
        var response_data = JSON.parse(XML.responseText);
        if(response_data["status"] == -1 || response_data["data"].length == 0) {
            alert("search error");
            return;

        }

        var dataset=response_data["data"];
        var pie_fun = d3.layout.pie()
        .sort(null)
        .value(function(d) {
         return d.value;
        });
        var pie = pie_fun(dataset); 
        //var pie=d3.layout.pie(dataset);
      
        var h=250;
        var w=250;
      
        var outerRadius=w/2;
        var innerRadius=w/4;
      
        var arc=d3.svg.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);
      
        var svg=d3.select(".container-attitude svg")
                .append("svg")
                .attr("width",w)
                .attr("height",h);
      
        
        var color=d3.scale.category10();
      
        var arcs=svg.selectAll("g.arc")
            .data(pie)
            .enter()
            .append("g")
            .attr("class","arc")
            .attr("transform","translate("+outerRadius+","+outerRadius+")");
      
        
        arcs.append("path")
            .attr("fill",function(d,i){
                return color(i);
            })
            .attr("d",arc);
      
      
        arcs.append("text")
            .attr("transform",function(d){ 
                return "translate("+arc.centroid(d)+")";
            })
            .attr("text-anchor","middle")
            .text(function(d){
                console.log(d);
                return d.data.key + ": " + d.value;
            });

      }
      
  }

  XML.open('GET', 'http://localhost:3001/api/v1/attitude?start_time='+start_time+'&end_time='+end_time, true)
  //XML.send("uuid="+uuid+"&time="+time+"&host="+host+"&url="+url+"&title="+title+"&link="+link+"&attitude="+attitude+"&learning="+learning);
  XML.send() 



  var XML1 = new XMLHttpRequest();
  XML1.onreadystatechange = function () {
      if (XML1.readyState == 4 && XML1.status == 200) {
    
        
        var response_data = JSON.parse(XML1.responseText);
        if(response_data["status"] == -1 || response_data["data"].length == 0) {
            alert("search error");
            return;

        }

        var dataset=response_data["data"];


        var rectPadding = 4;
        var width =250;
        var height =250;
        var svg = d3.select(".container-learning svg")
              .append("svg")
              .attr("width",width)
              .attr("height",height);
        var padding = {left:30,right:30,top:20,bottom:20};
        //var dataset = [20,10,33,12,30,5,40,24];

        //var dataset = [{"value": 6, "key": "Misinformation"}, {"value": 2, "key": "Real"}]

        var get_keys = function(data) {
          console.log(data);
          var fruits = [];
          for(var i=0;i<data.length;i++) {
              fruits.push(data[i]['key']);
          }
          return fruits;

        }
        var get_values = function(data) {
          var fruits = [];
          for(var i=0;i<data.length;i++) {
              fruits.push(data[i]['value']);
          }
          return fruits;

        }        
    
        var xScale = d3.scale.ordinal()
                    .domain(get_keys(dataset))
                    .rangeRoundBands([0,width-padding.left-padding.right]);
        

        var yScale = d3.scale.linear()
                    .domain([0,d3.max(get_values(dataset))])
                    .range([height-padding.top-padding.bottom,0]);
 

        var color = ["red","yellow","green","black","blue","gray","pink","purple"];
        var colorScale = d3.scale.ordinal()
                      .domain(d3.range(dataset.length))
                      .range(color);
        var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom");
        var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left");
        
        var rectPadding = 4;
        var rects = svg.selectAll(".MyRect")
                .data(get_values(dataset))
                .enter()
                .append("rect")
                .attr("class","MyRect")
                .attr("transform","translate("+padding.left+","+padding.top+")")
                .attr("x",function(d,i){
                  return xScale(dataset[i]["key"])+rectPadding/2;
                })
                .attr("y",function(d,i){                
                  return yScale(d);
                })
                .attr("width",xScale.rangeBand()-rectPadding)
                .attr("height",function(d){
                  return height-padding.top-padding.bottom-yScale(d);
                })
                .attr("fill",function(d,i){
                  return colorScale(dataset[i]["key"]);
                })
        
        var texts = svg.selectAll(".MyText")
                .data(get_values(dataset))
                .enter()
                .append("text")
                .attr("class","MyText")
                .attr("transform","translate("+ padding.left+","+padding.top+")")
                .attr("x",function(d,i){
                  return xScale(dataset[i]["key"])+rectPadding/2;
                })
                .attr("y",function(d){
                  return yScale(d);
                })
                .attr("dx",function(){
                  return (xScale.rangeBand()-rectPadding)/2;
                })
                .attr("dy",function(){
                  return 20;
                })
                .text(function(d){
                  return d;
                });
    
        svg.append("g")
          .attr("class","axis")
          .attr("transform","translate("+padding.left+","+(height-padding.bottom)+")")
          .call(xAxis);
        svg.append("g")
          .attr("class","axis")
          .attr("transform","translate("+padding.left+","+padding.top+")")
          .call(yAxis);
        
    }
  }


  XML1.open('GET', 'http://localhost:3001/api/v1/learning?start_time='+start_time+'&end_time='+end_time, true)
  //XML.send("uuid="+uuid+"&time="+time+"&host="+host+"&url="+url+"&title="+title+"&link="+link+"&attitude="+attitude+"&learning="+learning);
  XML1.send() 
  return true;
  
});
btnSubmit.addEventListener('click', () => {
  var website = document.getElementById('urlDisplay').innerHTML + "a";
  var reas = document.getElementById('Reason').value;
  var leaning;
  var attitude;
  const attitudeGet = document.querySelectorAll('input[name="attitude');
  attitudeGet.forEach(function(att){
    if(att.checked){
      attitude = att.value;
    }
  });
  const politic = document.querySelectorAll('input[name="learning"]');
  politic.forEach(function(lean) {
    if(lean.checked){
      leaning = lean.value;
    }
  });
  console.log("leaning: " + leaning);
  console.log(website);
  //var regex = /[.$#/[]]/g;
  //website = website.replace('.', '');
  console.log("HUllo" +website);
  console.log(reas);
  website = realURL.replace("https://www.", "");
  var index = website.indexOf("/");
 // website = website.substr(0, index+1) + website.slice(index+1).replace('/', '-');
 var output = website.split('/');
 output = output.shift() + (output.length ? '/' + output.join('') : '');
 website = output;
  website = website.replace(".com", "");
  website = website.replace(".", "");
  console.log("this is the url:" + website);

  sendData(leaning,generateIDTXT.value,attitude, website, document.getElementById("clockDisplay").innerHTML, reas);
  return true;
});
