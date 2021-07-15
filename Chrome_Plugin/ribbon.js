console.log("ribbon.js is active");
//document.body.onload = iframeRibbon();
//document.body.onload = dropDownRibbon();
console.log('dropdown ribbon initialized');
chrome.runtime.onMessage.addListener(gotMessage);
var leaning, factual;



function gotMessage(msg, sender, sendResponse){
  console.log('message recieved!');
  console.log(msg);
  try {
    var keys = Object.keys(msg);
    var k=keys[8];
    leaning = msg[k].leaning;
    factual = msg[k].factual;
    dropDownRibbon();
  } catch (error) {
    console.log(error);
  }
}

function dropDownRibbon(){
  try {
    document.getElementById('rbnDiv').remove();
  } catch (error) {
    console.log(error);
  }

  let rbnDiv = document.createElement('div');
  let style = document.createElement('style');
  let p1 = document.createElement('p');
  let p2 = document.createElement('p');
 
  rbnDiv.id='rbnDiv';
  p1.id='p1';
  p2.id='p2';

  style.textContent = '#rbnDiv{background-color:darkslategray; color:white; display:flex; height:50px;font-size:25px;} #p1{text-align:center;flex:1;} #p2{text-align:center;flex:1;}';
  p1.textContent = `${leaning}`;
  p2.textContent = `${factual}`;

  rbnDiv.appendChild(p1);
  rbnDiv.appendChild(p2);
  document.body.insertBefore(rbnDiv, document.body.firstChild);
  document.body.insertBefore(style, document.body.firstChild);
}

/*function iframeRibbon(){
  let frame = document.createElement('iframe');
  frame.src = "http://127.0.0.1:5500/WebDev/p5page/index.html";
  frame.style = "width: 100vw; height: 42px; border: 0px; overflow: hidden;"
  document.body.insertBefore(frame, document.body.firstChild);
}*/

