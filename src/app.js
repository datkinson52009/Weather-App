let now = new Date();
let h3 = document.querySelector("h3");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let min = now.getMinutes();

h3.innerHTML = day + " " + hour + ":" + min;

function updateCity(event) {
  event.preventDefault();
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  let min = now.getMinutes();

  h3.innerHTML = day + " " + hour + ":" + min;

  let searchInput = document.querySelector("#city-name");

  let h1 = document.querySelector("h1");
  h1.innerHTML = searchInput.value;

  let apiKey = "462d1f08d569f95ec1f23ff00bbaacc6";
  let units = "metric";
  //let city = "Dallas";

  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    searchInput.value +
    "&appid=" +
    apiKey +
    "&units=" +
    units;

  function showTemperature(response) {
    let currentTemp = document.querySelector(".currentTemp");
    currentTemp.innerHTML = Math.round(response.data.main.temp) + "°C";

    let low = document.querySelector(".low");
    low.innerHTML = "Low: " + Math.round(response.data.main.temp_min) + "°C";

    let wind = document.querySelector(".wind");
    wind.innerHTML = "Wind speed: " + response.data.wind.speed + "km/h";

    let humidity = document.querySelector(".humidity");
    humidity.innerHTML = "Humidity: " + response.data.main.humidity + "%";

    //console.log(response.data);
  }

  axios.get(apiUrl).then(showTemperature);
}

//api.openweathermap.org/data/2.5/
//weather?lat={lat}&lon={lon}&appid={API key}
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "462d1f08d569f95ec1f23ff00bbaacc6";
  //let currentLocationAPI =
  //"https://api.openweathermap.org/data/2.5/weather?lat=" +
  //latitude +
  //"&lon=" +
  //longitude +
  //"&appid=" +
  //apiKey;

  let currentCityAPI =
    "https://api.openweathermap.org/data/2.5/org/data/2.5/onecall?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=" +
    apiKey;
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let form = document.querySelector("#temp-search");
form.addEventListener("submit", updateCity);

//let button = document.querySelector("button");
//button.addEventListener("click", getCurrentPosition);
