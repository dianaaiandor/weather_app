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

// city engine

/*function pinCity() {
  let userCity = document.querySelector("#user-city");
  let defaultCity = document.querySelector("#default-city");
  defaultCity.innerHTML = userCity.value;
}*/

// c|f

/*
function changeTempF(event) {
  event.preventDefault();
  let temp = document.querySelector(".current-temperature");
  temp.innerHTML = `68`;
}
function changeTempC(event) {
  event.preventDefault();
  let temp = document.querySelector(".current-temperature");
  temp.innerHTML = `20`;
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeTempF);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeTempC);
*/

//current weather

function apiResponse(response) {
  console.log(response);

  //let tempOpenWeather = response.data.main.temp;
  //let currentTemp = document.querySelector(".current-temperature");
  //currentTemp.innerHTML = tempOpenWeather;

  // інший запис відображення для температури
  document.querySelector(".current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );

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

  /*let userCity = response.data.name;
  let defaultCity = document.querySelector("#default-city");
  defaultCity.innerHTML = userCity;*/
  // інший запис стрічок вище
  document.querySelector("#default-city").innerHTML = response.data.name;

  cleanUserCity();
  //додати дані для дощу
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

// my location - погода змінюється, але не відображається місто

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
