const { response } = require("express");
const express=require("express");
const bodyParser=require("body-parser")
const https=require("https");

const app=express();
app.use(bodyParser.urlencoded({extended:true}))

app.get("/" , function(req,res){
    res.sendFile(__dirname + "/index.html")
});

app.post("/" , function(req,res){
    const city=req.body.cityName
    const api="eb1230a378c4a55554e4d6a4e228ac1e"
    const unit="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + api + "&units=" + unit 

    https.get(url , function(response){
        console.log(response.statusCode);

        response.on("data" , function(data){
            
            const weatherData= JSON.parse(data)
            const temp=weatherData.main.temp
            const icon=weatherData.weather[0].icon
            const iconImg = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            console.log(temp);
            const description = weatherData.weather[0].description
            console.log(description);
            res.write("<h1>The temperature in " + city + " is " + temp + " degree celsius</h1>");
            res.write("<p> The weather is currently " + "<strong>" + "<h3>" + description + "</h3>");
            res.write("<br><img src=" + iconImg +"> ");
            res.send();
        });
    })
})
app.listen(3000 , function(){
    console.log("Server started");
});