//Global Variables
var cityInput = document.getElementById("city-input");
var searchCity = document.getElementById("submit");
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
// var fahrenheit = (temp * 9) / 5 + 32;
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
            temp.innerText = Math.floor(((data.daily[i].temp.max-273.15)*1.8)+32)+ "°F";

            var wind = document.getElementById("wind"+(i + 1))
            wind.innerText = data.daily[i].wind_speed;

            var humidity = document.getElementById("humidity"+(i + 1))
            humidity.innerText = data.daily[i].humidity;

            var uvIndex = document.getElementById("uv"+(i + 1))
            uvIndex.innerText = data.daily[i].uvi; 
            if ( data.daily[i].uvi < 3) {
                uvIndex.style.backgroundColor ="green"
            }
            else if (data.daily[i].uvi < 6) {
      
                uvIndex.style.backgroundColor ="yellow"
            }
            else if (data.daily[i].uvi < 8) {
                uvIndex.style.backgroundColor ="orange"
            }
            else if (data.daily[i].uvi < 11) {
                uvIndex.style.backgroundColor ="red"

            }
            else {
                uvIndex.style.backgroundColor ="purple"

            }
            var date = document.getElementById("date"+(i + 1))
            date.innerText = moment().tz(timeZone).add(i,"days").format("M/DD/YY")
            var iconUrl = `https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`;

            var icon = document.getElementById("icon"+(i + 1))
            icon.src = iconUrl;
        }

            

    }

    );
}

     //2nd promise


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

var uvWarnings = {
    green: "* You can safely stay outside using standard daily sun protection: broad spectrum SPF 30+ sunscreen containing zinc, sunglasses, and hat. Don't forget: in winter, reflection off snow can nearly double UV strength.",
    yellow: "* Stay in the shade during late morning through mid-afternoon. Wear broad spectrum SPF 30+ sunscreen containing zinc, sunglasses, and hat.",
    orange: "* Stay in the shade as much as possible, especially during late morning through mid-afternoon. Wear broad spectrum SPF 30+ sunscreen containing zinc, protective clothing (long-sleeved shirt and pants), sunglasses, and wide-brimmed hat.",
    red: "* Extra protection needed. Be careful outside, especially during late morning through mid-afternoon. Stay in the shade as much as possible, especially during late morning through mid-afternoon. Wear broad spectrum SPF 30+ sunscreen containing zinc, protective clothing (long-sleeved shirt and pants), sunglasses, and wide-brimmed hat. Please note: white sand on the beach will reflect UV rays and can double UV exposure.",
    purple: "* Extra protection needed. Avoid sun exposure during late morning through mid-afternoon. Unprotected skin and eyes can burn in minutes. Wear broad spectrum SPF 30+ sunscreen containing zinc, protective clothing (like long-sleeves), sunglasses, and wide-brimmed hat. Please note: white sand on the beach will reflect UV rays and can double UV exposure."
}