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
currentDay.innerHTML = `${day}, ${hours}:${minutes} <small>(GMT+2)</small>`;

// handle images

function displayImage(icon) {
  let iconPath = "";
  if (icon === `01d` || icon === "01n") {
    iconPath = "images/01d.svg";
  } else if (icon === `02d` || icon === "02n") {
    iconPath = "images/02d.svg";
  } else if (icon === `03d` || icon === `03n`) {
    iconPath = "images/03d.svg";
  } else if (icon === `04d` || icon === `04n`) {
    iconPath = "images/04d.svg";
  } else if (icon === `09d` || icon === `09n`) {
    iconPath = "images/09d.svg";
  } else if (icon === `10d` || icon === `10n`) {
    iconPath = "images/10d.svg";
  } else if (icon === `11d` || icon === `11n`) {
    iconPath = "images/11d.svg";
  } else if (icon === `13d` || icon === `13n`) {
    iconPath = "images/13d.svg";
  } else if (icon === `50d` || icon === `50n`) {
    iconPath = "images/50d.svg";
  } else {
    iconPath = "images/01d.svg";
  }

  return iconPath;
}

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
  let iconResponse = response.data.weather[0].icon;
  iconElement.setAttribute("src", displayImage(iconResponse));

  getForecast(response.data.coord);
  cleanUserCity();
}

function cleanUserCity() {
  document.getElementById("search-form").reset();
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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", main);
let mylocation = document.querySelector("#my-location");
mylocation.addEventListener("click", startNavigation);

apiRequest("Kyiv");
