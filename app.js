//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
//var item=" ";
var items = [];
var workItems=[];
app.get("/", function(req, res){
  
  var today=new Date();

  var option={
    weekday:"long",
    day:"numeric",
    month:"long"
  }

  var day=today.toLocaleDateString("en-US",option);


  res.render("list", {
    listTitle: day , 
    newListItems: items
  });
});


app.post("/" ,function(req,res){
  console.log(req.body);
  var item=req.body.newItem ; 

  if(req.body.button === "Work"){
    workItems.push(item);
    // workItems.pop();
    res.redirect("/work")
  }
  else{
    items.push(item);
    items.pop();
    res.redirect("/");
  }

});

app.get("/work" , function(req,res){
    res.render("list" , {
    listTitle:"Work List" , 
    newListItems: workItems
  });
});

app.post("/work",function(req,res){
  var item=req.body.newItem;
  workItems.push(item);
  res.redirect("/");
})

app.get("/about",function(req,res){
  res.render("about");
})
app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
