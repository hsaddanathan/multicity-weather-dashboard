console.log("Hello World");
$(document).ready(function(){
var apiKey = "cd1dd9c436f58d596d28363e12e23816"
var queryUrl= "https://api.openweathermap.org/data/2.5/weather?q=Atlanta,USA&appid=" + apiKey;


$.ajax({
    url: queryUrl,
    method: "GET"
}).then(function(response){
    console.log(response)
})



})