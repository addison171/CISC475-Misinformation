// content.js
function GetTime() {
    $(document).ready(function () {
        document.getElementById("clockDisplay").innerHTML = Date();
    });
}

$(document).ready(function() {
    GetTime();
    setInterval( GetTime, 1000 );
});
