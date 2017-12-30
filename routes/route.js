const express = require("express");
const router = express.Router();
// const db = require('../models/index');

router.get("/", (req, res)=>{
    res.render('index', {});
});

module.exports = router;