var cityInput = document.getElementById("city-input");
var submit = document.getElementById("submit");
submit.addEventListener("click",firstAPI);
function firstAPI(event){
    event.preventDefault();
    var cityName = cityInput.value;
    //create a button and append it to the search history
    //setting the inner text of the button
    //append the button to the search history div
    //push city name to empty array define as a global variable
    //reference the quiz game 
    //save it in local storage
    //for loop for appending the buttons on the page

    fetch("https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=e370853221b13b2bbf9ed25f7b4f15e1")
    .then(response => response.json())
    .then(data => {
        console.log(data)
    var lat = data.coord.lat;
    var lon = data.coord.lon;
    secondAPI(lat,lon);

    });

}
function secondAPI(lat,lon){
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&appid=e370853221b13b2bbf9ed25f7b4f15e1")
    .then(response => response.json())//1st promise
    .then(data => {
        console.log(data)
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
            date.innerText = data.daily[i].dt;

            var icon = document.getElementById("icon"+(i + 1))
            icon.innerText = data.daily[i].weather[0].icon;
        }

    }
     );//2nd promise
}
  
