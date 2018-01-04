const express = require("express");
var exphbs  = require('express-handlebars');
const bodyParser = require("body-parser");
var path = require("path");

const router = require('./routes/route');
const api = require('./routes/api');

const app = express();

//make all files available in Public folder
app.use(express.static(path.join(__dirname, 'public')))

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use('/', router);
app.use('/', api);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

console.log(app.settings.env);