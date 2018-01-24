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
    res.redirect('/events');
});

// login view
router.get("/login", (req, res) => {

    //clean slate -- remove token
    res.clearCookie('jwttoken');


    res.render('login', {});
});

// events view
router.get("/events", jwtauth, (req, res) => {

    //find all events and render object in handlebars
    db.Event.findAll()
        .then(function (data) {
            // to change date
            var startDate = [];
            var endDate = [];
            // console.log(data);
            data.forEach(function (event, index) {
                // console.log(index);
                data[index]['formattedStartDate'] = convertDate(data[index]['start_date']);
                data[index]['formattedEndDate'] = convertDate(data[index]['end_date']);

            });

            var results = {
                events: data,
                admin: req.admin,
                userID: req.userID,
                startDate: startDate,
                endDate: endDate

            }
            res.render('events', results);

        })
        //catch block to ensure if invalid data input the app does not crash
        .catch(function (err) {
            res.json(err);
        })
});

//function to convert date from sequelize format 'Sun Jul 23 2017 20:00:00 GMT-0400 (EDT)'
//to mm/dd/yyyy
function convertDate(date) {
    var dateString = date.toString();
    // console.log(dateString);
    var dateArray = dateString.split(" ");
    const month = dateArray[1] === "Jan" ? "01" : dateArray[1] === "Feb" ? "02" : dateArray[1] === "Mar" ? "03" : dateArray[1] === "Apr" ? "04" : dateArray[1] === "May" ? "05" : dateArray[1] === "Jun" ? "06" : dateArray[1] === "Jul" ? "07" : dateArray[1] === "Aug" ? "08" : dateArray[1] === "Sep" ? "09" : dateArray[1] === "Oct" ? "10" : dateArray[1] === "Nov" ? "11" : "12";
    const day = dateArray[2];
    const year = dateArray[3];
    var newDateString = `${month}\/${day}\/${year}`;
    // console.log("new date is " + newDateString);
    return newDateString;
}

// single event view
router.get("/events/:id", jwtauth, (req, res) => {

    //find all events and render object in handlebars
    db.Event.findOne({
            where: {
                id: req.params.id
            },

            include: [{
                model: db.User,
                attributes: ['first_name', 'last_name', 'email', 'id', 'imgUrl', 'active'] //don't include password
            }]

        })
        .then(function (data) {
            // console.log("DATA\n" + JSON.stringify(data, null, 2));

            //cleaning up dates for proper formatting
            var startDate = JSON.stringify(data.start_date).split("T")[0].replace(/["']/g, "")
            var endDate = JSON.stringify(data.end_date).split("T")[0].replace(/["']/g, "")

            var results = {
                event: data,
                admin: req.admin,
                startDate: startDate,
                endDate: endDate,
                users: data.Users
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
    if (!req.admin) {
        res.redirect(`/users/${req.userID}`);
    }  
    else{
    db.User.findAll()
        .then(function (data) {
            var results = {
                users: data,
                admin: req.admin,
                userID: req.userID,
                create: true
            }
            // console.log(results.User);
            res.render('users', results);
        })
        //catch block to ensure if invalid data input the app does not crash
        .catch(function (err) {
            res.json(err);
        })
    }

});

// list one volunteer view
router.get("/users/:id", jwtauth, (req, res) => {

// console.log("hitting user route")


    //TODO -- does req.userID === req.params.id? If not, user cannot access page 

    if (req.userID !== parseInt(req.params.id) && !req.admin) {
        res.redirect(`/users/${req.userID}`);


    } else {
        db.User.findOne({
                where: {
                    id: req.params.id
                },
                include: [{
                    model: db.Event,
                    attributes: ['event_name', 'start_date', 'end_date', 'id', 'imgUrl']
                }]
            })
            .then(function (data) {
                

                // to change date
                var startDate = [];
                var endDate = [];
                // console.log(data);
                data.Events.forEach(function (event, index) {
                    // console.log(index);
                    data.Events[index]['formattedStartDate'] = convertDate(data.Events[index]['start_date']);
                    data.Events[index]['formattedEndDate'] = convertDate(data.Events[index]['end_date']);

                });

                //clean up role type and status for readability
                var roleType
                var status

                if (req.admin){
                    roleType = "Admin"
                } else {
                    roleType = "User"
                }

                if (data.active){
                    status = "Active"
                } else {
                    status = "Disabled"
                }
                
                var results = {
                    user: data,
                    userID: req.userID,
                    admin: req.admin,
                    roleType: roleType,
                    status: status,
                    events: data.Events,
                    edit: true
                }
                res.render('user', results);
            })
            //catch block to ensure if invalid data input the app does not crash
            .catch(function (err) {
                res.json(err);
            })
    }

});

router.get("/logout", (req, res) => {
    //clear token cookie to force login next time
    //Path for the cookie. Defaults to “/”.
    // console.log("hitting the logout");
    res.clearCookie('jwttoken');

    res.redirect("/login");
});
module.exports = router;