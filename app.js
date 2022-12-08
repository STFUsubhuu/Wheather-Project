const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");
const port = process.env.PORT || 3000

const app =express();
app.use(bodyparser.urlencoded({extended : true}));


app.get("/", function(req, res){

  res.sendFile(__dirname + "/index.html");
  // res.send("Server is up and running.");
})

app.post("/", function(req, res){
  var query = req.body.CityName;
  var apikey = "dee0157691f0470d0fec91a243b56b05";
  const wheatherapi = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units=metric";
  https.get(wheatherapi, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      //Now  we want to tap into // TEMP:
      const temp = weatherData.main.temp;
      // console.log(weatherData);
      const descrip = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imag ="http://openweathermap.org/img/wn/"+ icon + "@2x.png"
      console.log(temp);
      console.log(descrip);
      res.write("<p>The Wheather is currently " + descrip + "<p>");
      res.write("<h1>Temperature in " + query + " is " + temp + " degree celcious <h1>");
      res.write("<img src=" + imag  + ">")
    })
  })
});

app.listen(port, function(){
  console.log("Your server started Bro");
})
