const express = require("express");

const port = 3000;

const app = express();
app.set("view engine", "ejs");
app.use( express.static("public"));


app.get("/", function(req, res){
  res.render("home");
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(port, function(){
  console.log("Server successfully started on port 3000");
})
