function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];

  let months = [
    "January",
    "February",
    "Mars",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentMonth = months[date.getMonth()];

  let currentDate = date.getDate();
  let currentHours = date.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let currentMilliseconds = date.getMilliseconds();
  let currentYear = date.getFullYear();

  let formattedDate = `${currentDay} ${currentHours}:${currentMinutes}`;

  return formattedDate;
}

let currentTime = new Date();

let lastUpdated = document.querySelector("#last-updated");

lastUpdated.innerHTML = formatDate(currentTime);

// Homework week 5

function showTheTemperature(response) {
  let h1 = document.querySelector("h1");
  let description = response.data.weather[0].description;
  h1.innerHTML = description;

  let h2 = document.querySelector("h2");
  let temperature = Math.round(response.data.main.temp);
  h2.innerHTML = temperature;

  let h3 = document.querySelector("h3");
  let city = response.data.name;
  h3.innerHTML = city;

  let wind = document.querySelector("#wind");
  let windSpeed = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  wind.innerHTML = windSpeed;

  let humidity = document.querySelector("#humidity");
  let humidityPercent = `Humidity: ${Math.round(response.data.main.humidity)}%`;
  humidity.innerHTML = humidityPercent;
}

function showTemperature() {
  let searchResult = document.querySelector("#search-result");
  let city = searchResult.value;
  let apiKey = "dff5c692192605ee5ed7f95b423ae857";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(url).then(showTheTemperature);
  console.log(city);
}

//search

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-result");
  let h3 = document.querySelector("h3");
  if (searchInput.value) {
    h3.innerHTML = `${searchInput.value}`;
    showTemperature();
  } else {
    document.getElementsByName("search")[0].placeholder =
      "Please enter a city...";
  }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

//current position

function showPosition(position) {
  let apiKey = "dff5c692192605ee5ed7f95b423ae857";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}&units=${units}`;

  axios.get(url).then(showTheTemperature);
}

function geolocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let position = document.querySelector("#locationClick");
position.addEventListener("click", geolocation);
