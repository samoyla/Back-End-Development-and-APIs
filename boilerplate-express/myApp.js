require('dotenv').config();

const bodyParser = require('body-parser');
let express = require('express');
let app = express();


console.log("Hello World");

// Use body-parser middleware to parse incoming request bodies
// Use bodyParser middleware to handle URL-encoded data
app.use(bodyParser.urlencoded({extended: false}));
// Use bodyParser middleware to handle JSON data
app.use(bodyParser.json());

// Middleware function to add current time to req.time
const addCurrentTime = (req, res, next) => {
    req.time = new Date().toString();
    next(); // Call next to move to the final handler
};

// Route with the middleware and the final handler
app.get('/now', addCurrentTime, (req, res) => {
    // Respond with a JSON object containing the current time
    res.json({ time: req.time });
});

app.use((req, res, next) =>{
    // const logString =  req.method + " " + req.path + " - " + req.ip;
    const logString = `${req.method} ${req.path} - ${req.ip}`;
    console.log(logString);
    next();
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) =>{
    //res.send('Hello Express');
    let absolutePath = __dirname + "/views/index.html";
    res.sendFile(absolutePath);
});

app.get("/json", (req, res) => {
    
    const messageStyle = process.env.MESSAGE_STYLE;
    let message = "Hello json";
    if (messageStyle === "uppercase") {
        message = message.toUpperCase();
    }
        res.json({
            message: message
        });
});

app.get("/:word/echo", (req, res) => {
    const {word} = req.params;
    res.json({
        echo:word
    });
});

app.post("/name",(req, res) => {
    let {first ,last} = req.body;
    res.json({
        name:`${first} ${last}`
    });
});

app.get("/name", (req, res)=>{
    let first = req.query.first;
    let second = req.query.last;
    // let {first: first, last: second} = req.query;
    res.json({
        name:`${first} ${second}`
    });
});

// app.route("/name")
// .get((req, res) => {
//     let first = req.query.first;
//     let second = req.query.last;
//     // let {first: first, last: second} = req.query;
//     res.json({
//         name:`${first} ${second}`
//     });
// })
// .post((req, res) => {
//     let {first, last} = req.query;
//     res.json({
//         name:`${first} ${last}`
//     });
// });

module.exports = app;
