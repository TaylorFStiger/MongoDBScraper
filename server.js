// dependencies
var express = require ("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require ("body-parser");

// set up port...either host's designated or 3000
var PORT = process.env.PORT || 3000;

// set up express
var app = express();

// set up express router
var router = express.Router();

// require our routes file and pass in router object
require("./config/routes")(router);

// designate public folder as a static directory
app.use(express.static(__dirname + "/public"));

// use bodyParser in the app
app.use(bodyParser.urlencoded({
    extended: false
}));


// Connect to handlebars
app.engine("handlebars", expressHandlebars({
    defaultLayout:"main"
}));
app.set("view engine", "handlebars");

// have every req go through router middleware
app.use(router);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, function(error) {
    if (error) {
        console.log(error);
    } else {
        console.log("mongoose connection is successful")
    }
})

app.listen(PORT, function() {
    console.log('Listening on port: http://localhost:' + PORT)
});