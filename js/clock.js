let tday = ["Suday", "Moday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let tmonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function GetClock() {
    let date = new Date();
    let day = date.getDay(),
        month = date.getMonth(),
        ndate = date.getDate(),
        year = date.getFullYear();
    let hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    if (min <= 9) min = "0" + min;
    if (sec <= 9) sec = "0" + sec;

    let datetext = tday[day] + ", " + tmonth[month] + " " + ndate + ", " + year;
    let clocktext = hour + ":" + min + ":" + sec + "";
    document.getElementById('date').innerHTML = datetext;
    document.getElementById('clock').innerHTML = clocktext;
}

GetClock();
setInterval(GetClock, 1000);