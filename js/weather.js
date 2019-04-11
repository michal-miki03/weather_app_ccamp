
let appKey = 'ed1e99463003ab25a982b7596d4a8ff3';
let units = 'metric';
const btn = document.getElementById('button');
const txtView = document.getElementById('textView');
let getTempratureCelsius = 0;
let getTempratureFahrenheit = 0;
let unit = document.getElementById('unit');
let city_name = document.getElementById('city-name');
let description = document.getElementById('description');
let temperature = document.getElementById('temperature');
let weather_icon = document.getElementById('weather-icon');
let humidity = document.getElementById('humidity');
let wind_speed = document.getElementById('wind-speed');
let pressure = document.getElementById('pressure');
let data = document.getElementById('data');
let country = document.getElementById('location');
let icon_pressure = document.getElementById('icon-pressure');
let icon_humidity = document.getElementById('icon-humidity');
let icon_wind = document.getElementById('icon-wind');

let skycons = new Skycons({
    "color": "white"
}, {
    "resizeClear": true
});

skycons.add('icon1', Skycons.CLEAR_DAY);
skycons.add('icon2', Skycons.PARTLY_CLOUDY_DAY);
skycons.add('icon3', Skycons.RAIN);
skycons.add('icon4', Skycons.CLEAR_NIGHT);
skycons.add('icon5', Skycons.PARTLY_CLOUDY_NIGHT);
skycons.add('icon6', Skycons.SNOW);

skycons.play();

btn.addEventListener('click', () => {
    let searchData = txtView.value;
    if (searchData) searchWeatherInfo(searchData);
});

txtView.addEventListener('keyup', (e) => {
    if (e.keyCode == 13) {
        let searchData = txtView.value;
        if (searchData) searchWeatherInfo(searchData);
    }
});

temperature.addEventListener('click', ()=>{
    console.log(temperature.textContent[-1]);
    if(unit.innerText == 'C'){ 
        getTempratureFahrenheit = (getTempratureCelsius  * 1.8) + 32;
        temperature.innerHTML = `${Math.floor(getTempratureFahrenheit)}&#176`;
        unit.innerText = 'F';
    }
    else{
        temperature.innerHTML = `${Math.floor(getTempratureCelsius)}&#176`;
        unit.innerText = 'C';
    }
})

function searchWeatherInfo(cityName){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${appKey}&units=${units}`)
    .then(async (resp) => {
        if(resp.ok){
            return resp.json();
        }
    })
    .then(resp => {
        run(resp);
    })
    .catch(e => {
        console.log('Connection error', e);
        runError();
})}

function run(receivedData){
    city_name.innerText = receivedData.name;
    
    data.style.display = 'block';

    weather_icon.src = `https://openweathermap.org/img/w/${receivedData.weather[0].icon}.png`;
    description.innerText = receivedData.weather[0].description;
    getTempratureCelsius = receivedData.main.temp;
    temperature.innerHTML = `${Math.floor(getTempratureCelsius)}&#176`;
    unit.innerText = 'C';
    icon_pressure.src = 'img/icons8-atmospheric-pressure-filled-32.png';
    pressure.innerHTML = `Pressure: ${receivedData.main.pressure} hPa `;
    icon_humidity.src = 'img/icons8-humidity-32.png';
    humidity.innerHTML = `Humidity: ${receivedData.main.humidity} %`;
    icon_wind.src = 'img/icons8-air-32.png';
    wind_speed.innerHTML = `Wind speed: ${receivedData.wind.speed} m/s`;
    country.innerText = `Country: ${receivedData.sys.country}`;
}

function runError(){
    let city_name = document.getElementById('city-name');
    city_name.innerHTML = 'No city in database, <br> please try again 😉';
    data.style.display = 'none';
}



