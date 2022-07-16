
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

const port = 3000;


app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const email = req.body.email

  const data = {
    members: [
      {
        email_address: email,
        email_type: "html",
        status: "subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName,
        }

      }
    ]
  }

  const jasonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/f370baf9d5";

  const options = {
    method: "POST",
    auth: "jiwec1:84ae482f0f6e9b93c429aed9314b352c-us14"
  }

  const request = https.request(url, options, function(response){

    var code = response.statusCode

    if (code === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })

request.write(jasonData);
request.end();

});


app.post("/failure", function(req, res){
  res.redirect("/")
});

app.listen(process.env.PORT || port, function(){
  console.log("Server is running on port " + port);
});




// MailChimp API KEY
// 84ae482f0f6e9b93c429aed9314b352c-us14

// Audience id
// f370baf9d5
