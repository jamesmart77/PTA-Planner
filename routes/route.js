const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
// const db = require('../models/index');

var jwtauth = require('../models/jwtAuth.js');


// these are the html/handlebars views

// homepage
router.get("/", (req, res) => {
    res.render('index', {});
});

// admin login view
router.get("/admin/login", (req, res) => {
    res.render('login', {});
});

// volunteer login view
router.get(" /volunteer/login", (req, res) => {
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
    res.render('volunteers', {});
});

module.exports = router;