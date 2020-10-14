console.log("Hello World");
var apiKey = "cd1dd9c436f58d596d28363e12e23816"
$(document).ready(function(){
    var searchCity = $("#search-ciy")
    console.log(moment().format("L"))  
    // var queryUrl= "https://api.openweathermap.org/data/2.5/weather?q=Atlanta,USA&appid=" + apiKey;

// var storedCites = JSON.parse(localStorage.getItem(""))
// var cityName = "" || cityHistory[0];

// $.ajax({
//     url: queryUrl,
//     method: "GET"
// }).then(function(response){
//     console.log(response)
// })



})

//Get Weather Data
function currentWeather(cityName){
    var queryUrl= "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).done(function(response){
        console.log(response);
        $("#city-name").text(""+response.name+" " + moment().format("L")).append($('<img class="images" src ="https://openweathermap.org/img/wn/' + response.weather[0].icon + '.png"/>'));
    })
}










//Event Listeners
$("#submit-city").on("click",function(event){
    event.preventDefault();
    cityName = $("#city-input").val();
    console.log(cityName)
    currentWeather(cityName);
})