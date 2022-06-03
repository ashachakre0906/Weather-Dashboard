var cityInput = document.getElementById("city-input");
var submit = document.getElementById("submit");
submit.addEventListener("click",firstAPI);
function firstAPI(event){
    event.preventDefault();
    var cityName = cityInput.value;
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
        for (i = 0 ; i < 3 ; i++){
            var header = document.getElementById("header-"+(i + 1))
            header.innerText = data.daily[i].temp.max;
        }

    }
     );//2nd promise
}