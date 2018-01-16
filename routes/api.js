const express = require("express");
const jwt = require("jsonwebtoken");
var secret = require('../config/secrets.js');

const api = express.Router();
const db = require('../models/')
// const db = require('../models/index');


// get all events
api.get("/api/events", (req, res) => {
    console.log("/api/events in api.js");
    db.Event.findAll()
        .then(function (data) {
            console.log(data);
            res.json(data);
        })
        //catch block to ensure if invalid data input the app does not crash
        .catch(function (err) {
            res.json(err);
        })
});

// get one event
api.get("/api/events/:id", (req, res) => {

    db.Event.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(function (data) {
            console.log(data);
            res.json(data);
        })
        //catch block to ensure if invalid data input the app does not crash
        .catch(function (err) {
            res.json(err);
        })
});

// create an event
api.post("/api/events", (req, res) => {
    //adding in sequelize code here LH
    console.log("/api/events");
    db.Event.create(req.body)
        .then(function (event) {
            res.json(event);
        })
        //catch block to ensure if invalid data input the app does not crash
        .catch(function (err) {
            res.json(err);
        })
});

// udpate an event
api.put("/api/events/:id", (req, res) => {

    var eventID = req.params.id;

    console.log("eventID: " + eventID);

    // db.Event.update(
    //     req.body, {
    //         where: {
    //             id: req.body.id
    //         }
    //     }).then(function (dbPost) {
    //     res.json(dbPost);
    // });
});

// delete an event
api.delete("/api/events/:id", (req, res) => {

});

// get all users
api.get("/api/users", (req, res) => {
    console.log("/api/users in api.js");
    db.User.findAll()
        .then(function (data) {
            console.log(data);
            res.json(data);
        })
        //catch block to ensure if invalid data input the app does not crash
        .catch(function (err) {
            res.json(err);
        })
});

// create a user
api.post("/api/users", (req, res) => {

    db.User.create(req.body)
        .then(result => {
            console.log(result);
            res.json(result);
        })
        .catch(function (err) {
            console.log(err);
            res.json(err);
        })

});

// edit a user
api.put("/api/users/:id", (req, res) => {

});

// delete a user
api.delete("/api/users/:id", (req, res) => {

});

// try to login 
api.post("/api/login", (req, res) => {
    //console.log(req.body.email);

    //TODO -- VALIDATE EMAIL & PASSWORD AGAINST DB
    //TODO -- IF VALID ADMIN, ASSIGN ADMIN: TRUE (KEY:VALUE PAIR) TO TOKEN
    const user = {
        email: req.body.email,
        password: req.body.password
    }

    const token = jwt.sign({
        user
    }, secret.tokenSecret);

    //store the JWT in the client's browser
    res.cookie('jwttoken', token);

    res.json({
        token: token
    });
});

// add a volunteer to an event
api.post("/api/staging", (req, res) => {

});

module.exports = api;