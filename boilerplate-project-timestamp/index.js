// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date_string?", (req, res) => {
  const dateString = req.params.date_string;
  let date;

  if(!dateString){
    date = new Date();
  }else if(!isNaN(dateString)){
    const timestamp =parseInt(dateString);
    date = new Date(timestamp >= 0 && timestamp <= 9999999999 ? timestamp * 1000 : timestamp);
  }else {
    date = new Date(dateString);
  }

  if(isNaN(date.getTime())){
    return res.json({error: "Invalid Date"});
  }

  const unixTimestamp = date.getTime();
  const utcDate = date.toUTCString();

  res.json({unix: unixTimestamp, utc: utcDate});
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
