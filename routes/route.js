const express = require("express");
const router = express.Router();
const db = require('../models');
// const jwt = require("jsonwebtoken");
// const db = require('../models/index');

//middleware to authenticate jwt token
//jwtauth will attach user propertiy to req upon authentication to all handlebars customization
var jwtauth = require('./jwtAuth.js');


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
    
    console.log("isAdmin - eventRoute: " + req.admin);
    //find all events and render object in handlebars
    db.Event.findAll()
        .then(function (data) {

            // console.log("DATA: " + JSON.stringify(data));
            var results = {
                events: data,
                admin: req.admin
            }
            res.render('events', results);
        })
        //catch block to ensure if invalid data input the app does not crash
        .catch(function (err) {
            res.json(err);
        })
    // res.render('events', {});
});

// a view of the users associated with an event (not part of MVP as I understand it)
router.get("/events/users", (req, res) => {
    res.render('events', {});
});

// list all volunteers view
router.get("/users", (req, res) => {
    db.User.findAll()
    .then(function (data) {
        var results = {
            users: data
        }
        console.log(results.User);
        res.render('users', results);
    })
    //catch block to ensure if invalid data input the app does not crash
    .catch(function (err) {
        res.json(err);
    })
    
});

// list one volunteer view
router.get("/users/:id", (req, res) => {
    db.User.findOne()
    .then(function () {
        var results = {
            users: req.params.id
        }
        console.log(results.User);
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
    console.log("hitting the logout");
    res.clearCookie('jwttoken');

    res.redirect("/login");
});
module.exports = router;