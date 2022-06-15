## Weather-Dashboard

## Decsription of the project

The challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.The server-side API used to get response data object is retrieved from the Open Weather API.User should be able to search for any city name which would display current weather conditions,the temperature, the humidity, the wind speed, the UV index and five days forecast of that particular city.We are storing the previously searched cities in Local Storage and persistently displaying the same cities on the webpage.UV index is presented with a color that indicates whether conditions are favorable, moderate, or severe.

## Links

[Solution URL](https://github.com/ashachakre0906/Weather-Dashboard)<br>
[Deploy URL](https://ashachakre0906.github.io/Weather-Dashboard/)<br>

## User Story
```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```
## Acceptance Criteria
```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## Built with

- HTML
- CSS
- Javascript
- Bootstrap. 
### Screenshots of Search city and Five-days forecast
<img src = ./assets/images/search-city.png>
<img src = ./assets/images/five-days-forecast.png>

### Code Snippets 

#### For loop dynamically creating buttons and displaying previously searched cities to the webpage.Once user clicks on any buttons should pull the weather condition for the selected city.
```
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
```
#### if condition to indicates whether the conditions are favorable, moderate, or severe
```
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
uvIndex.style.backgroundColor ="pink" //critical
}

```
## Author
Asha Chakre

## License

Licensed under the [MIT](https://choosealicense.com/licenses/mit/) license.

Copyright (c) [2022] [Asha Chakre]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.