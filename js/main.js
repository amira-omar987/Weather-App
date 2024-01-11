//TODAY VARIABLES

let todayName = document.getElementById("today-date-day-name");
let todayNumber = document.getElementById("today-date-day-number");
let todayMonth = document.getElementById("today-date-month");
let todayLocation = document.getElementById("today-location");
let todayTemp = document.getElementById("today-temp");
let todayConditionImg = document.getElementById("today-condition-img");
let todayConditionText = document.getElementById("today-condition-text");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let windDirection = document.getElementById("wind-direction");

// NEXT DATA

let nextDay = document.getElementsByClassName("next-day-name");
let nextMaxTemp = document.getElementsByClassName("next-max-temp");
let nextMiniTemp = document.getElementsByClassName("next-min-temp");
let nextConditionImg = document.getElementsByClassName("next-condition-img");
let nextConditionText = document.getElementsByClassName("next-condition-text");

//SEARCH INPUT

let searchInput = document.getElementById("search");

//FETCH API DATA

async function getWeatherData(cityName) {
  let weatherResponse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=b5af764d0da64fd9a4b195530240301&q=${cityName}&days=3`
  );
  let weatherData = await weatherResponse.json();
  return weatherData;
}

//DISPLAY TODAY DATA

function displayTodayData(data) {
  let todayDate = new Date();
  todayName.innerHTML = todayDate.toLocaleDateString("en-US", {
    weekday: "long",
  });
  todayNumber.innerHTML = todayDate.getDate();
  todayMonth.innerHTML = todayDate.toLocaleDateString("en-US", {
    month: "long",
  });

  todayLocation.innerHTML = data.location.name;
  todayTemp.innerHTML = data.current.temp_c;
  todayConditionImg.setAttribute("src", data.current.condition.icon);
  todayConditionText.innerHTML = data.current.condition.text;
  humidity.innerHTML = data.current.humidity + "%";
  wind.innerHTML = data.current.wind_kph + "km/h";
  windDirection.innerHTML = data.current.wind_dir;
}

//DISPLAY NEXT DAYS DATA

function displayNextData(data) {
  let forecastData = data.forecast.forecastday;
  for (let i = 0; i < 2; i++) {
    let nextDate = new Date(forecastData[i + 1].date);
    nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    nextMaxTemp[i].innerHTML = forecastData[i + 1].day.maxtemp_c;
    nextMiniTemp[i].innerHTML = forecastData[i + 1].day.mintemp_c;
    nextConditionImg[i].setAttribute(
      "src",
      forecastData[i + 1].day.condition.icon
    );
    nextConditionText[i].innerHTML = forecastData[i + 1].day.condition.text;
  }
}

//start app

async function startApp(city = "Alexandria") {
  let weatherData = await getWeatherData(city);
  if (!weatherData.error) {
    displayTodayData(weatherData);
    displayNextData(weatherData);
  }
}

startApp();

searchInput.addEventListener("input", function () {
  startApp(searchInput.value);
});

// Function to get weather data based on user's location
async function getWeatherDataByLocation(latitude, longitude) {
  let weatherResponse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=b5af764d0da64fd9a4b195530240301&q=${latitude},${longitude}&days=3`
  );
  let weatherData = await weatherResponse.json();
  return weatherData;
}

// Function to get user's location and fetch weather data
function getUserLocationAndWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const weatherData = await getWeatherDataByLocation(latitude, longitude);
      if (!weatherData.error) {
        displayTodayData(weatherData);
        displayNextData(weatherData);
      }
    });
  } else {
    // Handle the case where geolocation is not supported or denied by the user
    console.log("Geolocation is not supported by this browser.");
  }
}

// Call the function to get user's location and fetch weather data
getUserLocationAndWeather();





