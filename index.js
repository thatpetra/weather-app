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
  celsiusTemperature = response.data.temperature.current;

  let h1 = document.querySelector("h1");
  let description = response.data.condition.description;
  h1.innerHTML = description;

  let h2 = document.querySelector("h2");
  let temperature = Math.round(celsiusTemperature);
  h2.innerHTML = temperature;

  let h3 = document.querySelector("h3");
  let city = response.data.city;
  let country = response.data.country;
  let location = city + ", " + country;
  h3.innerHTML = location;

  let wind = document.querySelector("#wind");
  let windSpeed = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  wind.innerHTML = windSpeed;

  let humidity = document.querySelector("#humidity");
  let humidityPercent = `Humidity: ${Math.round(
    response.data.temperature.humidity
  )}%`;
  humidity.innerHTML = humidityPercent;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
}

function showTemperature() {
  let searchResult = document.querySelector("#search-result");
  let city = searchResult.value;
  let apiKey = "33td32abd4b4o9207f70a36fd77fdbb8";
  let units = "metric";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

  axios.get(url).then(showTheTemperature);
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

//current position - currently doesnt work

function showPosition(position) {
  let apiKey = "33td32abd4b4o9207f70a36fd77fdbb8";
  let lat = position.coordinates.latitude;
  let lon = position.coordinates.longitude;
  let units = "metric";
  let url = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`;

  axios.get(url).then(showTheTemperature);
}

function geolocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let position = document.querySelector("#locationClick");
position.addEventListener("click", geolocation);

//Fahreinheit

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempChange");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#tempChange");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let celsiusTemperature = null;

function defaultSearch(city) {
  let apiKey = "33td32abd4b4o9207f70a36fd77fdbb8";
  let units = "metric";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(url).then(showTheTemperature);
}

defaultSearch("Washington");
