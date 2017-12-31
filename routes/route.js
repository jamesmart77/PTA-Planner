const express = require("express");
const router = express.Router();
// const db = require('../models/index');

router.get("/", (req, res)=>{
    res.render('index', {});
});

router.get("/admin/login", (req, res)=>{
    res.render('login', {});
});

router.get(" /volunteer/login", (req, res)=>{
    res.render('login', {});
});

router.get("/events", (req, res)=>{
    res.render('events', {});
});

router.get("/volunteers", (req, res)=>{
    res.render('volunteers', {});
});

module.exports = router;