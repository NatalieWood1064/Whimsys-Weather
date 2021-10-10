function searchCityTime(timestamp){
  let now = new Date(timestamp * 1000);
  let date = now.getDate();
  let hours = now.getHours();
  
  let year = now.getFullYear();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let day = days[now.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let month = months[now.getMonth()];
  let ampm = hours >= 12 ? 'p.m.' : 'a.m.';
     hours = hours % 12;
     hours = hours ? hours : 12;
  let minutes = now.getMinutes();
     if (minutes < 10) {
       minutes = `0${minutes}`;
     }
   
  
  return  `${day}, ${month} ${date}, ${year} ${hours}:${minutes} ${ampm}`;
 
 }odaysDate.innerHTML = `${day}, ${month} ${date}, ${year}. ${hours}:${minutes}`;
 
 
 
 function formatForecastDays (timestamp) {
  let date = new Date (timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  
  return days[day];
  }
  
  function displayForecast(response){

    console.log(response.data.hourly);
    
    let hourly = response.data.hourly;

    let hourlyElement = document.querySelector("#hourly");
  
    let hourlyHTML = `<div class="row">`;

    hourly.forEach(function (forecastHour, index) {
      if(index < 6){
//        let iconImage = icons()[forecastHour.weather[0].icon];
        hourlyHTML = hourlyHTML + `
        <div class="col-2 p-4 my-4 gx-1 per-hour">
        <div class="border bg-light rounded-pill">
          <div class="hourly">${formatForecastHours(forecastHour.dt)}
            <div class="hourlyTemp">${Math.round(forecastHour.temp)}°</div>
            </div>
            </div>
      </div>`;
      }
    });
  
  hourlyHTML = hourlyHTML + `</div>`;
  hourlyElement.innerHTML = hourlyHTML; 
  console.log(hourlyHTML);

    let forecast = response.data.daily;
  
    let forecastElement = document.querySelector("#forecast");
    
    let forecastHTML = `<div class="row">`;
    
    forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML = forecastHTML + `
      <div class="col-2 p-2">
      <div class="border bg-light rounded-pill">
        <div class="forecast-day">
          ${formatForecastDays(forecastDay.dt)}</div>
          <img 
          src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
          alt=""
          width="38"
          /> 
          <div>
          <span class="forecast-max">${Math.round(forecastDay.temp.max)}°</span>
          <span class="forecast-min">${Math.round(forecastDay.temp.min)}°</span>
          </div>
          </div>
    </div>`;
  }
    });
  
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML; 
    console.log(forecastHTML);
    console.log(response);
    
    }
  
  
  
    function getForecast(coordinates) {
      console.log(coordinates);
  
      let apiKey = "ae392b466a0914493e8f74cba2d5458a";
      let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
      axios.get(apiUrl).then(displayForecast);
    }
 
 
 
 
 function showCity(response) {
   console.log(response);
   let mainIcon = document.querySelector("#main-icon");
   mainIcon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
   mainIcon.setAttribute("alt", response.data.weather[0].description);
   if(response.data.rain !== undefined){ 
    document.querySelector("#precipitation").innerHTML= `Precipitation ${response.data.rain["1h"]} `;
    }
   fahrenheitTemp = response.data.main.temp;
   document.querySelector("#todays-date").innerHTML = searchCityTime(response.data.dt);
   document.querySelector("#location").innerHTML = response.data.name;
   document.querySelector("#description").innerHTML = response.data.weather[0].description;
   document.querySelector("#temp").innerHTML = Math.round(fahrenheitTemp);
   document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
   document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
   document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
   document.querySelector("#high-of").innerHTML=Math.round(response.data.main.temp_max);
   document.querySelector("#low-of").innerHTML=Math.round(response.data.main.temp_min);
  
   getForecast(response.data.coord);
   }
 
 
 
 
 
 function searchCity(city) {
   let apiKey = "ae392b466a0914493e8f74cba2d5458a";
   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
   axios.get(apiUrl).then(showCity);
 }
 
 function inquiry(event) {
   console.log(event);
   event.preventDefault();
   let inquireInput = document.querySelector("#inquire");
   let apiKey = "ae392b466a0914493e8f74cba2d5458a";
   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inquireInput.value}&appid=${apiKey}&units=imperial`;
   axios.get(apiUrl).then(showCity);
 }
 
 
 function displayCurrentTemp(response) {
   console.log(response.data);
 let mainIcon = document.querySelector("#main-icon");
 mainIcon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
 mainIcon.setAttribute("alt", response.data.weather[0].description);
 if(response.data.rain !== undefined){ 
  document.querySelector("#precipitation").innerHTML= `Precipitation ${response.data.rain["1h"]} `;
  }
   fahrenheitTemp = response.data.main.temp;
   document.querySelector("#location").innerHTML = response.data.name;
   document.querySelector("#description").innerHTML = response.data.weather[0].description;
   document.querySelector("#temp").innerHTML = Math.round(fahrenheitTemp);
   document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
   document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
   document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
   document.querySelector("#high-of").innerHTML=Math.round(response.data.main.temp_max);
   document.querySelector("#low-of").innerHTML=Math.round(response.data.main.temp_min);

   getForecast(response.data.coord);
     }
 
 
 function showLocation(position) {
   console.log(position);
   let lat = position.coords.latitude;
   let lon = position.coords.longitude;
   let units = "imperial";
   let apiKey = "ae392b466a0914493e8f74cba2d5458a";
   let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
   let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
   console.log(apiUrl);
   axios.get(apiUrl).then(displayCurrentTemp);

   fahrenheitLink.classList.add("active"); 
   celsiusLink.classList.remove("active");
 }
 
 
 function getCurrentLocation(event) {
   event.preventDefault();
   navigator.geolocation.getCurrentPosition(showLocation);
 }
 
 
 
 
 function displayCelsius(event) {
   event.preventDefault();
   let tempElement = document.querySelector("#temp");
   celsiusLink.classList.add("active");
   fahrenheitLink.classList.remove("active");
   let celsiusTemp = ((fahrenheitTemp - 32) * 5)/9;
   tempElement.innerHTML = Math.round(celsiusTemp);
 }
 
 function displayFahrenheit(event) {
 event.preventDefault();
 celsiusLink.classList.remove("active");
 fahrenheitLink.classList.add("active");
 let tempElement = document.querySelector("#temp");
 tempElement.innerHTML = Math.round(fahrenheitTemp);
 }
 
 
 
 
 let fahrenheitTemp = null;
 
 let searchForm = document.querySelector("#search-form");
 searchForm.addEventListener("submit", inquiry);
 
 let currentButton = document.querySelector("#current-location");
 currentButton.addEventListener("click", getCurrentLocation);
 
 let celsiusLink = document.querySelector("#celsius");
 celsiusLink.addEventListener("click", displayCelsius);
 
 let fahrenheitLink = document.querySelector("#fahrenheit");
 fahrenheitLink.addEventListener("click", displayFahrenheit);
 
 searchCity("New York");