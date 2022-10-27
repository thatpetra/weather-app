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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row justify-content-around weekdays">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` 
          <div class="col-2">
            <div class="weekdays">${formatDay(forecastDay.time)}</div>
            <img class="w-100 weather-emojis" src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
              forecastDay.condition.icon
            }.png"></img>
          <div class="forecast-temperature">
            <span class="future-temperature"> ${Math.round(
              forecastDay.temperature.day
            )}°<pan>
            </div>
            </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = `33td32abd4b4o9207f70a36fd77fdbb8`;
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayForecast);
}

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
  let windSpeed = `${Math.round(response.data.wind.speed)} km/h`;
  wind.innerHTML = windSpeed;

  let humidity = document.querySelector("#humidity");
  let humidityPercent = `${Math.round(response.data.temperature.humidity)}%`;
  humidity.innerHTML = humidityPercent;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}

function showTemperature() {
  let searchResult = document.querySelector("#search-result");
  let city = searchResult.value;
  let apiKey = "33td32abd4b4o9207f70a36fd77fdbb8";
  let units = "metric";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

  axios.get(url).then(showTheTemperature);
}

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

//current position - currently doesnt work

function showPosition(position) {
  let apiKey = "33td32abd4b4o9207f70a36fd77fdbb8";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let url = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`;

  axios.get(url).then(showTheTemperature);
}

function geolocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempChange");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#tempChange");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function defaultSearch(city) {
  let apiKey = "33td32abd4b4o9207f70a36fd77fdbb8";
  let units = "metric";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(url).then(showTheTemperature);
}

let currentTime = new Date();

let lastUpdated = document.querySelector("#last-updated");
lastUpdated.innerHTML = formatDate(currentTime);

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let position = document.querySelector("#locationClick");
position.addEventListener("click", geolocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let celsiusTemperature = null;

defaultSearch("Paris");
