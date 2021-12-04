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
    currentTemp.innerHTML = response.data.main.temp;
    console.log(response.data);
    console.log(response.data.main.temp_min);
    console.log(response.data.wind.speed);
    console.log(response.data.main.humidity);
  }

  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#temp-search");
form.addEventListener("submit", updateCity);
