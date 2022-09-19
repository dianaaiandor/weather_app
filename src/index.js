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

//current weather

function apiResponse(response) {
  console.log(response);

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

  cleanUserCity();
}

function apiRequest() {
  let city = document.querySelector("#user-city").value;
  console.log("city", city);

  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(apiResponse);
}

function main(event) {
  event.preventDefault();
  apiRequest();
  //pinCity();
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
