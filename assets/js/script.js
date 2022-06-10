//Global Variables
var cityInput = document.getElementById("city-input");
var searchCity = document.getElementById("submit");
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
// const fahrenheit = (temp * 9) / 5 + 32;
searchCity.addEventListener("click",firstAPI);
function firstAPI(event){
    event.preventDefault();
    console.log(event);
    var cityName = cityInput.value.trim();
    if (event.target.innerText !== "Search"){
        cityName = event.target.innerText
    }
    else if (event.target.innerText == "Search" && cityName == ""){
        return;

    }
    console.log(cityName);
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
    //set the elements .innerhtml = cityname
    localStorage.setItem("search",JSON.stringify(searchHistory));
    console.log(searchHistory);
    cityInput.value = "";
    //set storage
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=e370853221b13b2bbf9ed25f7b4f15e1")
    .then(response => response.json())
    .then(data => {
    console.log(data)
    var lat = data.coord.lat;
    var lon = data.coord.lon;
    secondAPI(lat,lon);
    var firstCard = document.getElementById("city1");
    firstCard.innerText = data.name;
    });

}
function secondAPI(lat,lon){
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&appid=e370853221b13b2bbf9ed25f7b4f15e1")
    .then(response => response.json())//1st promise
    .then(data => {
        console.log(data)
        var timeZone = data.timezone;
        console.log(timeZone);
        for (i = 0 ; i < 6 ; i++){
            // var header = document.getElementById("header-"+(i + 1))
            // header.innerText = data.daily[i].temp.max;
            var temp = document.getElementById("temp"+(i + 1))
            temp.innerText = data.daily[i].temp.max;

            var wind = document.getElementById("wind"+(i + 1))
            wind.innerText = data.daily[i].wind_speed;

            var humidity = document.getElementById("humidity"+(i + 1))
            humidity.innerText = data.daily[i].humidity;

            var uvIndex = document.getElementById("uv"+(i + 1))
            uvIndex.innerText = data.daily[i].uvi; 

            var date = document.getElementById("date"+(i + 1))
            date.innerText = moment().tz(timeZone).add(i,"days").format("M/DD/YY")
            var iconUrl = `https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`;

            var icon = document.getElementById("icon"+(i + 1))
            icon.src = iconUrl;

    }
});
     //2nd promise
}


// getting previous searched city from the local storage and adding button 
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

// function to save the city to local storage
// submit.addEventListener("click".function()){
//     firstAPI(cityName);
//     searchHistory.push(cityName);
//     localStorage.setItem("search",JSON.stringify("searchHistory"));

