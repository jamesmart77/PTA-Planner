const express = require("express");
const router = express.Router();
const db = require('../models/')
// const jwt = require("jsonwebtoken");
// const db = require('../models/index');

//middleware to authenticate jwt token
var jwtauth = require('./jwtAuth.js');


// these are the html/handlebars views

// homepage
router.get("/", jwtauth, (req, res) => {
 res.render('index', {});
   // res.render(path.join(__dirname, "users.handlebars"));
});

// login view
router.get("/login", (req, res) => {
    res.render('login', {});
});

// events view
router.get("/events", jwtauth, (req, res) => {

    res.render('events', {});
});

// a view of the volunteers associated with an event (not part of MVP as I understand it)
router.get("/events/volunteers", (req, res) => {
    res.render('events', {});
});

// list all volunteers view
router.get("/volunteers", (req, res) => {
    db.User.findAll()
    .then(function (data) {
        var results = {
            users: data
        }
        console.log(data.User);
        res.render('users', results);
    })
    //catch block to ensure if invalid data input the app does not crash
    .catch(function (err) {
        res.json(err);
    })
    
});

router.get("/logout", (req, res) => {
    //clear token cookie to force login next time
    //Path for the cookie. Defaults to “/”.
    res.clearCookie('jwttoken', { path: '/login' });
});
module.exports = router;