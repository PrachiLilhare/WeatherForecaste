const weatherApi = {
    key: "35592787c500ac7792596e7e7b12b9cd",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

//Event listener on weather body
let weatherDetails = document.getElementById('weather-body');

const searchInputBox = document.getElementById('input-box');
//Using Event Listener
searchInputBox.addEventListener('keypress', (event) => {
    //keyCode of Enter button is 13
    if (event.keyCode == 13) {
        console.log(searchInputBox.value);
        weatherDetails.style.display="block";
        getWeatherDetails(searchInputBox.value);
    }
});

//Get Weather Details
function getWeatherDetails(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(weather => {
            //console.log(weather.json());
            return weather.json();
        }).then(showWeatherDetails);
}

//Show Details on UI
function showWeatherDetails(weather) {
    //console.log(weather);
    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minmax = document.getElementById('min-max');
    minmax.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

    let weatherType = document.getElementById('weatherDisplay');
    weatherType.innerText = `${weather.weather[0].main}`;
    
    let date = document.getElementById('dateSearch');
    let todayDate = new Date();
    date.innerText = showDate(todayDate);
    //console.log(date.innerText);

    
    if(weatherType.textContent == 'Clear'){
        document.body.style.backgroundImage = "url('/img/clear.jpg')";
    }else if(weatherType.textContent == 'Haze'){
        document.body.style.backgroundImage = "url('/img/sunny.jpg')";
    }else if(weatherType.textContent == 'Thunderstorm'){
        document.body.style.backgroundImage = "url('/img/stormy.jpg')";
    }else if(weatherType.textContent == 'Clouds'){
        document.body.style.backgroundImage = "url('/img/cloudy1.jpg')";
    }else if(weatherType.textContent == 'Rain'){
        document.body.style.backgroundImage = "url('/img/rainy.jpg')";
    }else if(weatherType.textContent == 'snow'){
        document.body.style.backgroundImage = "url('/img/snow.jpg')";
    }else if(weatherType.textContent == 'Mist'){
        document.body.style.backgroundImage = "url('/img/mist.jpg')";
    }
}

//Date Message

function showDate(dateArgs) {
    
    //Converting number of days in to Day : Monday etc
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //Converting month(in number) in to month(in words)
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    

    let Year = dateArgs.getFullYear();
    let Month = months[dateArgs.getMonth()];
    let DateEle = dateArgs.getDate();
    let Day = days[dateArgs.getDay()];
    //console.log(DateEle);

    //Time Calculation
    let Hour = dateArgs.getHours();
    //hours in 12 hr formate 
    let HourIn12hrFormat = Hour >= 13 ? Hour % 12 : Hour;
    let Minutes = dateArgs.getMinutes();

    //Find Am-Pm
    let Ampm = Hour >= 12 ? 'PM' : 'AM';
    //Updating Time
    //let AMPM = `<span id="am-pm">${ampm}</span>`;
    let timeElement ;
    timeElement = (HourIn12hrFormat < 10? '0'+HourIn12hrFormat : HourIn12hrFormat) + ':' + ((Minutes < 10)? '0'+Minutes : Minutes) + `${Ampm}` ;

    
    //console.log(timeElement);
    return `${DateEle} ${Month} ${Day}, ${Year} \n ${timeElement}`;

}