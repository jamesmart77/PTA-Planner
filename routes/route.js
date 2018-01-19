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

    //find all events and render object in handlebars
    db.Event.findAll()
        .then(function (data) {
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
});

// single event view
router.get("/events/:id", jwtauth, (req, res) => {

    //find all events and render object in handlebars
    db.Event.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(function (data) {
            console.log("DATA\n" + JSON.stringify(data.start_date));

            //cleaning up dates for proper formatting
            var startDate = JSON.stringify(data.start_date).split("T")[0].replace(/["']/g, "")
            var endDate = JSON.stringify(data.end_date).split("T")[0].replace(/["']/g, "")

            var results = {
                event: data,
                admin: req.admin,
                startDate: startDate,
                endDate: endDate
            }
            res.render('event', results);
        })
        //catch block to ensure if invalid data input the app does not crash
        .catch(function (err) {
            res.json(err);
        })
});

// a view of the users associated with an event (not part of MVP as I understand it)
router.get("/events/users", jwtauth, (req, res) => {
    res.render('events', {});
});

// list all volunteers view
router.get("/users", jwtauth, (req, res) => {
    db.User.findAll()
        .then(function (data) {
            var results = {
                users: data,
                admin: req.admin
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
router.get("/users/:id", jwtauth, (req, res) => {

    //TODO -- does req.userID === req.params.id? If not, user cannot access page

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