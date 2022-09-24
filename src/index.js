// date
function formatTime(value) {
  if (value < 10) {
    return `0${value}`;
  } else {
    return value.toString();
  }
}

let nowdate = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[nowdate.getDay()];
let hours = formatTime(nowdate.getHours());
let minutes = formatTime(nowdate.getMinutes());

let currentDay = document.querySelector("h2");
currentDay.innerHTML = `${day}, ${hours}:${minutes} `;
// forecast

function formatDay(timestamp) {
  let forecastDays = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let formatedDay = days[forecastDays.getDay()];
  return formatedDay;
}

function displayForecast(responce) {
  console.log("ForecastResponse", responce.data.daily);
  let forecastResponse = responce.data.daily;
  console.log(forecastResponse);
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;

  forecastResponse.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `     <div class="col-2">
            <p class="date">${formatDay(forecastDay.dt)}</p>
            <div class="forecast-icon">
            
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="" width="100%" />
            </div>
            <p class="forecast-temp">${Math.round(forecastDay.temp.day)}°C</p>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "85bbd3d16a2dfe0ecf253c7ae1e8fe03";
  let units = "metric";
  let apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=hourly,minutely&appid=${apiKey}&units=${units}`;
  console.log("APIForecast", apiUrlForecast);

  console.log("MyCoord", coordinates);
  axios.get(apiUrlForecast).then(displayForecast);
}

//current weather

function apiResponse(response) {
  console.log("MyWeather", response);

  celsiusTemperature = response.data.main.temp;
  let currentTemp = document.querySelector(".current-temperature");
  currentTemp.innerHTML = Math.round(celsiusTemperature);

  // інший запис відображення для температури
  /*document.querySelector(".current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );*/

  let feelingOpenWeather = Math.round(response.data.main.feels_like);
  let currentFeeling = document.querySelector("#feeling");
  currentFeeling.innerHTML = feelingOpenWeather;

  let windOpenWeather = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = windOpenWeather;

  let humidityOpenWeather = Math.round(response.data.main.humidity);
  let currenthumidity = document.querySelector("#humidity");
  currenthumidity.innerHTML = humidityOpenWeather;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#default-city").innerHTML = response.data.name;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
  cleanUserCity();
}

function apiRequest(city) {
  console.log("city", city);
  let apiKey = "b18e7038c22b269163f18cda5225176b";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(apiResponse);
}

function main(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#user-city").value;
  apiRequest(cityInput);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", main);

function retrievePosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(latitude);
  console.log(longitude);
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(apiResponse);
}

function startNavigation() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let mylocation = document.querySelector("#my-location");
mylocation.addEventListener("click", startNavigation);

function cleanUserCity() {
  document.getElementById("search-form").reset();
}

// c|f

function changeTempF(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let tempF = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector(".current-temperature").innerHTML = Math.round(tempF);
}
function changeTempC(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let tempC = (document.querySelector(".current-temperature").innerHTML =
    Math.round(celsiusTemperature));
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", changeTempF);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", changeTempC);

let celsiusTemperature = null;
apiRequest("Kyiv");
