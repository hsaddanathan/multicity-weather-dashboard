var apiKey = "cd1dd9c436f58d596d28363e12e23816"
$(document).ready(function(){
    //Search Value
    var searchCity = $("#city-input")

    //Sets variable from local storage
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
    searchCity.value="";
}
//Get UV Index
function getUVIndex(lat,lon){
    var queryUrl= "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon  + "&appid=" + apiKey + "&units=imperial";
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        fiveDayForecast(response);
        console.log(response)
        var uV = response.current.uvi;
        $("#uv-index").text("UV Index: " + uV);
    })
}
//Generate City buttons by saving to local storage
function cityButtons(cityName){
    var cityHistory = [];
    cityHistory.push(cityName);
    storedCities.unshift(cityName);
    localStorage.setItem("history",JSON.stringify(storedCities));

    for (var i = 0; i < cityHistory.length;i++){
        var newDiv = $("<div>");
        newDiv.append($("<button type='button' class='btn btn-light city-button'>"+cityHistory[i]+"</button>")
        );
          $("#saved-cities").prepend(newDiv);
    }


}
//Five Day Forecast
function fiveDayForecast(response){
    $("#five-day-display").empty();
    for(var i=1; i<6;i++){
        var newDay = response.daily[i];
        var newDate = moment().add(i,'days').format("L");

        var newCard = $('<div class="card text-white bg-primary ml-1" style="max-width: 18rem; display: inline-block"></div>'
        );
        newCard.append("<div class='card-header'>"+newDate+"</div>");
        newCard.append($('<img class="images" src ="https://openweathermap.org/img/wn/' + newDay.weather[0].icon + '.png"/>'));
        newCard.append('<div class="card-body"></div>').append('<p class="card-title">'+Math.floor(newDay.temp.min)+String.fromCharCode(176)+"/"+Math.ceil(newDay.temp.max)+String.fromCharCode(176)+'</p>').append('<p class="card-text">'+"Humidity: "+newDay.humidity+"%"+'</p>')

    $("#five-day-display").append(newCard);
    }
}
//What happens upon reload
function pageOnLoad(){
    for(var i=0; i<storedCities.length; i++){
        var newDiv = $("<div>");
        newDiv.append($("<button type='button' class='btn btn-light city-button'>"+storedCities[i]+"</button>")
        );
          $("#saved-cities").append(newDiv);
    }

}
pageOnLoad();





//Event Listeners
    //Search button
$("#submit-city").on("click",function(event){
    event.preventDefault();
    cityName = searchCity.val();
    if(cityName===""){
        searchCity.value="";
        return;
    }
        else{currentWeather(cityName);
            cityButtons(cityName);
            searchCity.empty();
        }
})
    //City Button
$("#saved-cities").on("click", ".btn",function(){
    currentWeather(this.textContent);
})
})