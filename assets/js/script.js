//Global Variables
var cityInput = document.getElementById("city-input");
var searchCity = document.getElementById("submit");
var todaysWeatherSummary = document.getElementById("todaysWeather");
var fiveDaysforeCast = document.getElementById("forecast");
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
searchCity.addEventListener("click",firstAPI);
function firstAPI(event){
    event.preventDefault();
    todaysWeatherSummary.style.display = "block";//hiding the style of "Current weather summary" through CSS and repopulating with javascript
    fiveDaysforeCast.style.display = "block";//hiding the style of "five days forecast" through CSS and repopulating with javascript
    // console.log(event);   
    var cityName = cityInput.value.trim();//This will retun the cityName
    console.log(cityName);
    if (event.target.innerText !== "Search"){
        cityName = event.target.innerText
    }
    else if (event.target.innerText == "Search" && cityName == ""){
        return;

    }
    if (searchHistory.includes(cityName)){
    }
    else {
        searchHistory.push(cityName);
        var button = document.createElement("button");
        button.classList.add("btn","btn-light","prev-city");
        button.innerText = cityName;
        button.addEventListener("click",firstAPI)
       document.getElementById("previously-searched").appendChild(button);
        
    }
    //saving the cities to local storage 
    localStorage.setItem("search",JSON.stringify(searchHistory));
    console.log(searchHistory);
    cityInput.value = "";//This saving the number of cities user previously searched
    //Fetching First API replaced the query parameter to cityName
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=e370853221b13b2bbf9ed25f7b4f15e1")
    .then(response => response.json())
    .then(data => {
    console.log(data)
    var lat = data.coord.lat;
    var lon = data.coord.lon;
    secondAPI(lat,lon);
    var firstCard = document.getElementById("city1");//Targetting the firstCard
    firstCard.innerText = data.name;//This will return the cityName
    console.log(data.name);
    });

}
//fetching second API,passing the arguments lat and lon
function secondAPI(lat,lon){
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&appid=e370853221b13b2bbf9ed25f7b4f15e1")
    .then(response => response.json())//1st promise
    .then(data => {
        console.log(data)
        var timeZone = data.timezone;//This will return the timeZone
        console.log(timeZone);
        for (i = 0 ; i < 6 ; i++){
            var temp = document.getElementById("temp"+(i + 1))
            //This will pull the temperature from the API.
            // Math.floor method rounds a number DOWNWARDS to the nearest integer, and returns the result
            temp.innerText = Math.floor(((data.daily[i].temp.max-273.15)*1.8)+32)+ "°F";
            //This will pull the wind speed from the API.
            var wind = document.getElementById("wind"+(i + 1))
            wind.innerText = data.daily[i].wind_speed;
            //This will pull the humidity from the API.
            var humidity = document.getElementById("humidity"+(i + 1))
            humidity.innerText = data.daily[i].humidity + "%";
            //This will pull the uvIndex from the API.
            var uvIndex = document.getElementById("uv"+(i + 1))
            uvIndex.innerText = data.daily[i].uvi; 
            //if condition to  indicates whether the conditions are favorable, moderate, or severe
            if ( data.daily[i].uvi < 3) {
                uvIndex.style.backgroundColor ="green" //favourable
            }
            else if (data.daily[i].uvi < 6) {
      
                uvIndex.style.backgroundColor ="yellow" //moderate
            }
            else if (data.daily[i].uvi < 8) {
                uvIndex.style.backgroundColor ="orange" //still moderate but you still need sunscreen
            }
            else if (data.daily[i].uvi < 11) {
                uvIndex.style.backgroundColor ="red" //severe

            }
            else {
                uvIndex.style.backgroundColor ="pink" //critical

            }
            var date = document.getElementById("date"+(i + 1))
            date.innerText = moment().tz(timeZone).add(i,"days").format("M/DD/YY")//This will return the days, date and timezone using moment.js.
            var iconUrl = `https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`;
            var icon = document.getElementById("icon"+(i + 1)) 
            icon.src = iconUrl;//This will return the weather icon
        }

    }

    );
}

// Returning previously searched city from the local storage and dynamically adding button 
function history(){
    for (i = 0; i < searchHistory.length; i++){
        var button = document.createElement("button");
        button.classList.add("btn","btn-light","prev-city");
        button.innerText = searchHistory[i];
        button.addEventListener("click",firstAPI)
       document.getElementById("previously-searched").appendChild(button);
    }
   
}
history();
