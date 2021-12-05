function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return day + " " + hours + ":" + minutes;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let fahrenheitElement = document.querySelector("#fahrenheit");
  fahrenheitElement.addEventListener("click", convertToFahrenheit);
  let celciusElement = document.querySelector("#celcius");
  celciusElement.addEventListener("click", convertToCelcius);
  function convertToFahrenheit(event) {
    event.preventDefault();
    temperatureElement.innerHTML = Math.round(
      Math.round(response.data.main.temp) * 1.8 + 32
    );
  }
  function convertToCelcius(event) {
    event.preventDefault();
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
  }
  //let celciusElement = document.querySelector("#celcius");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    "http://openweathermap.org/img/wn/" +
      response.data.weather[0].icon +
      "@2x.png"
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "462d1f08d569f95ec1f23ff00bbaacc6";
  let units = "metric";

  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=" +
    units;

  axios.get(apiUrl).then(displayTemperature);
}

function updateCity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-name");
  search(cityInputElement.value);
}

//let city = "Lawton";
search("Lawton");

let form = document.querySelector("#temp-search");
form.addEventListener("submit", updateCity);

// let now = new Date();
// let h3 = document.querySelector("h3");

// let days = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];
// let day = days[now.getDay()];
// let hour = now.getHours();
// let min = now.getMinutes();

// h3.innerHTML = day + " " + hour + ":" + min;

// function updateCity(event) {
//   event.preventDefault();
//   let now = new Date();
//   let days = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];
//   let day = days[now.getDay()];
//   let hour = now.getHours();
//   let min = now.getMinutes();

//   h3.innerHTML = day + " " + hour + ":" + min;

//   let searchInput = document.querySelector("#city-name");

//   let h1 = document.querySelector("h1");
//   h1.innerHTML = searchInput.value;

//   let apiKey = "462d1f08d569f95ec1f23ff00bbaacc6";
//   let units = "metric";
//   //let city = "Dallas";

//   let apiUrl =
//     "https://api.openweathermap.org/data/2.5/weather?q=" +
//     searchInput.value +
//     "&appid=" +
//     apiKey +
//     "&units=" +
//     units;

//   function showTemperature(response) {
//     let currentTemp = document.querySelector(".currentTemp");
//     currentTemp.innerHTML = Math.round(response.data.main.temp) + "°C";

//     let low = document.querySelector(".low");
//     low.innerHTML = "Low: " + Math.round(response.data.main.temp_min) + "°C";

//     let wind = document.querySelector(".wind");
//     wind.innerHTML = "Wind speed: " + response.data.wind.speed + "km/h";

//     let humidity = document.querySelector(".humidity");
//     humidity.innerHTML = "Humidity: " + response.data.main.humidity + "%";
//   }

//   axios.get(apiUrl).then(showTemperature);
// }

// function showPosition(position) {
//   let latitude = position.coords.latitude;
//   let longitude = position.coords.longitude;
//   let apiKey = "462d1f08d569f95ec1f23ff00bbaacc6";

//   let currentCityAPI =
//     "https://api.openweathermap.org/data/2.5/org/data/2.5/onecall?lat=" +
//     latitude +
//     "&lon=" +
//     longitude +
//     "&appid=" +
//     apiKey;
// }

// function getCurrentPosition() {
//   navigator.geolocation.getCurrentPosition(showPosition);
// }

// let form = document.querySelector("#temp-search");
// form.addEventListener("submit", updateCity);
