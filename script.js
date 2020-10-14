console.log("Hello World");
var apiKey = "cd1dd9c436f58d596d28363e12e23816"
$(document).ready(function(){
    var searchCity = $("#search-ciy")
    console.log(moment().format("L"))  
    // var queryUrl= "https://api.openweathermap.org/data/2.5/weather?q=Atlanta,USA&appid=" + apiKey;

var storedCities = JSON.parse(localStorage.getItem("history")) || [];
var cityName = "" || storedCities[0];







//Get Weather Data
function currentWeather(cityName){
    var queryUrl= "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=imperial";

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).done(function(response){
        console.log(response);
        $("#city-name").text(""+response.name+" (" + moment().format("L") + ")").append($('<img class="images" src ="https://openweathermap.org/img/wn/' + response.weather[0].icon + '.png"/>'));
        $("#temp").text("Temperature: " + Math.ceil(response.main.temp)+ String.fromCharCode(176) + "F");
        $("#humid").text("Humidity: " + response.main.humidity + "%");
        $("#wind-speed").text("Wind Speed: " + response.wind.speed + " MPH");
        getUVIndex(response.coord.lat, response.coord.lon);
    })
}

function getUVIndex(lat,lon){
    var queryUrl= "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon  + "&appid=" + apiKey + "&units=imperial";
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        console.log(response)
        var uV = response.current.uvi;
        $("#uv-index").text("UV Index: " + uV);
    })
}

function cityButtons(cityName){
    var cityHistory = [];
    cityHistory.push(cityName);
    storedCities.unshift(cityName);
    localStorage.setItem("history",JSON.stringify(storedCities));


}








//Event Listeners
$("#submit-city").on("click",function(event){
    event.preventDefault();
    cityName = $("#city-input").val();
    console.log(cityName)
    currentWeather(cityName);
    cityButtons(cityName);
})

})