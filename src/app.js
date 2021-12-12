function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let morning = "AM";
  let afternoon = "PM";
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
  if (hours > 11) {
    return day + " " + hours + ":" + minutes + " " + afternoon;
  }
  if (hours < 12) {
    return day + " " + hours + ":" + minutes + " " + morning;
  }
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class ="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2">
<div class="weather-forecast-day">${formatDay(forecastDay.dt)} 
  <img src="http://openweathermap.org/img/wn/${
    forecastDay.weather[0].icon
  }@2x.png" 
  alt="" width="50px"></div>
  <div class ="weather-forecast-temperatures">
<span class ="weather-forecast-high">${Math.round(
          forecastDay.temp.max
        )}°</span> 
<span class="weather-forecast-low">${Math.round(forecastDay.temp.min)}°</span>
</div>
  </div>

`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "462d1f08d569f95ec1f23ff00bbaacc6";

  let apiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    coordinates.lat +
    "&lon=" +
    coordinates.lon +
    "&appid=" +
    apiKey +
    "&units=metric";

  axios.get(apiUrl).then(displayForecast);
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
    celciusElement.classList.remove("active");
    fahrenheitElement.classList.add("active");
    temperatureElement.innerHTML = Math.round(
      Math.round(response.data.main.temp) * 1.8 + 32
    );
  }
  function convertToCelcius(event) {
    event.preventDefault();
    celciusElement.classList.add("active");
    fahrenheitElement.classList.remove("active");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
  }

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

  getForecast(response.data.coord);
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
