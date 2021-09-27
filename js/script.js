//Assign Elements ID
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
//console.log(currentWeatherItemsEl);

// const timeZone = document.getElementById('time-zone');
// const countryEl = document.getElementById('country');

const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

//API Keys using 
const API_KEY = '35592787c500ac7792596e7e7b12b9cd';
//Converting number of days in to Day : Monday etc
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//Converting month(in number) in to month(in words)
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    //hours in 12 hr formate 
    const hourIn12hrFormat = hour >= 13 ? hour % 12 : hour;
    const minutes = time.getMinutes();

    //Find Am-Pm
    const ampm = hour >= 12 ? 'PM' : 'AM';
    //Updating Time
    timeEl.innerHTML = (hourIn12hrFormat < 10? '0'+hourIn12hrFormat : hourIn12hrFormat) + ':' + ((minutes < 10)? '0'+minutes : minutes) + ' ' + `<span id="am-pm">${ampm}</span>`;

    //Updating Date
    dateEl.innerHTML = days[day] + ',' + date + ' ' + months[month];
}, 1000);
getWeatherData();
function getWeatherData() {
    //Know your current location 
    navigator.geolocation.getCurrentPosition((success) => {
        //console.log(success);
        let { latitude, longitude } = success.coords;
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
            //console.log(data);
            showWeatherData(data);
        });
    });
}

function showWeatherData(data) {
    let { humidity, pressure, sunrise, sunset, wind_speed } = data.current;

    currentWeatherItemsEl.innerHTML =
        `<div class="weather-items">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-items">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-items">
        <div>Wind-speed</div>
        <div>${wind_speed}</div>
    </div>
    <div class="weather-items">
        <div>Sunrise</div>
        <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-items">
        <div>Sunset</div>
        <div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
    </div>`;

    let otherDayForecast = '';
    data.daily.forEach((day, idx) => {
        if (idx == 0) {
            currentTempEl.innerHTML =
                `<img src=" http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather-icon" class="w-icon">
            <div class="others">
                <div class="day">${window.moment(day.dt * 1000).format('dddd')}</div>
                <div class="temp">Night - ${day.temp.night}&#176; C</div>
                <div class="temp">Day - ${day.temp.day}&#176; C</div>
            </div>`
        } else {
            otherDayForecast +=
                `<div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather-icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176; C</div>
                <div class="temp">Day - ${day.temp.day}&#176; C</div>
            </div>`
        }
    });

    weatherForecastEl.innerHTML = otherDayForecast;
}
