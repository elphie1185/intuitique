require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const port = 3000;

const app = express();
app.set("view engine", "ejs");
app.use( express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//  Home page
app.get("/", function(req, res){
  res.render("home");
});

// Solution Page
app.get("/solutions", function(req, res){
  res.render("solutions");
});

// About Us Page
app.get("/about", function(req, res){
  res.render("about");
});

// Contact us page
app.route("/contact")
  .get(function(req, res){
    res.render("contact");
  })
  .post(function(req, res){
    const listID = process.env.LISTID;
    const apiKey = process.env.APIKEY;
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    var data = {
      members: [
        {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName
          }
        }
      ]
    };

    var jsonData = JSON.stringify(data);

    const url = "https://us7.api.mailchimp.com/3.0/lists/" + listID;
    const options = {
      method: "POST",
      auth: "elphie1181:" + apiKey
    };

    const request = https.request(url, options, function(response){
      response.on("data", function(data){
        console.log(url);
        // console.log(JSON.parse(data));
      })
    })

    request.write(jsonData);
    request.end;
});


// Set the server
app.listen(port, function(){
  console.log("Server successfully started on port 3000");
})
