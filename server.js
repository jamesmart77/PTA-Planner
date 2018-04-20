const express = require("express");
var exphbs = require('express-handlebars');
var Handlebars = require('handlebars');
const bodyParser = require("body-parser");
var path = require("path");
var expressJWT = require('express-jwt');
var cookieParser = require('cookie-parser');
const db = require('./models')

const router = require('./routes/route');
const api = require('./routes/api');
require('dotenv').config();
var secret = {};
secret.tokenSecret = process.env.tokenSecret;

const app = express();

//make all files available in Public folder
app.use(express.static(path.join(__dirname, 'public')))

// hbs to test if user is logged in...will be used in main.handlebars
Handlebars.registerHelper("isLoggedIn", function (admin) {
    console.log("ADMIN\n" + admin);
    if (admin === true || admin === false) {
        return true;
    } else {
        return false;
    }
});

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

//needed for JWT
app.use(cookieParser());

app.use('/', router);
app.use('/', api);

if (app.settings.env === "production") {
    db.sequelize.sync().then(function () {
        app.listen(PORT, function () {
            console.log("App listening on PORT " + PORT);
        });
    });
} else {
    db.sequelize.sync({
        force: true
    }).then(function () {
        app.listen(PORT, function () {
            console.log("App listening on PORT " + PORT);
        });
    });
}



console.log(app.settings.env);