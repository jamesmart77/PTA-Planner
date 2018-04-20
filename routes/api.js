const bcrypt = require('bcrypt');
const express = require("express");
const jwt = require("jsonwebtoken");
require('dotenv').config();
var secret = {};
secret.tokenSecret = process.env.tokenSecret;
var jwtauth = require('./jwtAuth.js');


const api = express.Router();
const db = require('../models/')
// const db = require('../models/index');

//middleware to authenticate jwt token
//jwtauth will attach user propertiy to req upon authentication to all handlebars customization
var jwtauth = require('./jwtAuth.js');

// get all events
api.get("/api/events", jwtauth, (req, res) => {
    console.log("/api/events in api.js");
    db.Event.findAll()
        .then(function (data) {
            // console.log(data);
            res.json(data);
        })
        //catch block to ensure if invalid data input the app does not crash
        .catch(function (err) {
            res.json(err);
        })
});

// get one event
api.get("/api/events/:id", jwtauth, (req, res) => {

    db.Event.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(function (data) {
            // console.log(data);
            res.json(data);
        })
        //catch block to ensure if invalid data input the app does not crash
        .catch(function (err) {
            res.json(err);
        })
});

// create an event
api.post("/api/events", jwtauth, (req, res) => {
    //adding in sequelize code here LH
    const newEvent = req.body;
    newEvent.imgUrl = newEvent.imgUrl !== "" ? newEvent.imgUrl : '/assets/images/event.png';
    // console.log("/api/events");
    db.Event.create(newEvent)
        .then(function (event) {
            res.json(event);
        })
        //catch block to ensure if invalid data input the app does not crash
        .catch(function (err) {
            res.json(err);
        })
});

// udpate an event
api.put("/api/events", jwtauth, (req, res) => {

    // console.log("eventID: " + eventID);

    db.Event.update(
        req.body, {
            where: {
                id: req.body.id
            }
        }).then(function (dbEvent) {
        res.json(dbEvent);
    });
});

// delete an event
api.delete("/api/events/:id", jwtauth, (req, res) => {
    db.Event.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (event) {
        res.json(event);
    });
});

// get all users
api.get("/api/users", jwtauth, (req, res) => {
    // console.log("/api/users in api.js");
    if (req.admin) {
    db.User.findAll()
        .then(function (data) {
            // console.log(data);
            res.json(data);
        })
        //catch block to ensure if invalid data input the app does not crash
        .catch(function (err) {
            res.json(err);
        })
    }
    else {
        res.redirect("/events")
    };
});

// get one user
api.get("/api/users/:id", jwtauth, (req, res) => {

    db.User.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(function (data) {
            // console.log(data);
            res.json(data);
        })
        //catch block to ensure if invalid data input the app does not crash
        .catch(function (err) {
            res.json(err);
        })
});

// create a user
api.post("/api/users", jwtauth, (req, res) => {
    //create an object to store user data
    var user = {};
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    // user.imgUrl = req.body.img_url add this when the user create gets updated
    
    //if we need to obtain this from jwtauth cookies in the req.email 
    // user.email = req.email;
    //if we need to obtain this from jwtauth cookies in the req as req.password
    // user.password = req.password;

    user.email = req.body.email;
    user.password = req.body.password;
    user.roleID = req.body.roleID;
    user.active = req.body.active;
    user.imgUrl = req.body.imgUrl;
    
    
    // if (req.body.active === "active") {
    //     user.active = true;
    // } else {
    //     user.active = false;
    // }

    db.User.create(user)
        .then(result => {
            // console.log(result);
            res.json(result);
        })
        .catch(function (err) {
            // console.log(err);
            res.json(err);
        })

});

// edit a user
api.put("/api/users", jwtauth, (req, res) => {

    if(req.body.password){
        db.User.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(function (dbUser) {
            // console.log(data);

            // if true hash new password
            if(bcrypt.compareSync(req.body.oldPassword, dbUser.dataValues.password)){
                delete req.body.oldPassword;

                bcrypt.hash(req.body.password, 10, function(err, hash) {
                    // Store hash in your password DB.
                    req.body.password = hash;
                    db.User.update(
                        req.body, {
                            where: {
                                id: req.body.id
                            }
                        }).then(function (dbUser) {
                        res.json(dbUser);
                    }); // end udpate

                  }); // end hash

            } // end if

        }); // end of promise
 
    }
    else {
        db.User.update(
            req.body, {
                where: {
                    id: req.body.id
                }
            }).then(function (dbUser) {
            res.json(dbUser);
        }); // end update
    } // end if/else
  


}); // emd route

// udpate an event
api.put("/api/events", jwtauth, (req, res) => {

    // console.log("eventID: " + eventID);

    db.Event.update(
        req.body, {
            where: {
                id: req.body.id
            }
        }).then(function (dbEvent) {
        res.json(dbEvent);
    });
});

// delete a user
api.delete("/api/users/:id", jwtauth, (req, res) => {

});

// try to login 
//NO auth here because this route needs to query if user exists
//and will then sign a token
api.post("/api/login", (req, res) => {

    console.log("IN API LOGIN ROUTE");


    
    // Store hash in your password DB.
    db.User.findOne({
            where: {
                email: req.body.email,
                active: true
            }
        })
        .then(function (data) {
            // console.log(data);

            if(bcrypt.compareSync(req.body.password, data.dataValues.password)){
                const user = {
                    email: data.dataValues.email,
                    password: data.dataValues.password,
                    admin: data.dataValues.roleID === 2 ? true : false,
                    userID: data.dataValues.id
                }
    
                const token = jwt.sign(
                    user, secret.tokenSecret);
    
                // console.log("TOKEN: " + JSON.stringify(token));
    
                //store the JWT in the client's browser
                res.cookie('jwttoken', token);
    
                res.json({
                    token: token
                });
                
            }
            else{
                res.json({
                    error: "password does not match"
                });
            }
            
        })
        //catch block to ensure if invalid data input the app does not crash
        .catch(function (err) {

            console.log("ERROR");
            console.log(err);

            res.json(err);
        })
});

// add a user to an event
//passing in JWT object to extract userID from cookie data in the form of req.userID 
api.post("/api/staging", jwtauth, (req, res) => {

    // console.log(req.userID);
    var data = {
        EventId: req.body.EventId,
        UserId: req.userID
    }

    db.Staging.create(data)
        .then(result => {
            // console.log(result);
            res.json(result);
        })
        .catch(function (err) {
            // console.log(err);
            res.json(err);
        })

});

api.delete("/api/staging", jwtauth, (req, res) => {

    // console.log("REQUEST BODY\N" + JSON.stringify(req.body));
    // var data = {
    //     EventId: req.body.EventId,
    //     UserId: req.userID
    // }

    db.Staging.destroy({
        where: {
            EventId: req.body.eventId,
            UserId: req.body.userId
        }
    }).then(function (data) {
        res.json(data);
    }).catch(function(err){
        res.json(err);
    })

});

module.exports = api;