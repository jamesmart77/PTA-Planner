var jwt = require('jsonwebtoken');
var expressJWT = require('express-jwt');
var secret = require('../config/secrets.js');

// console.log("anything...")
//middleware to validate token
module.exports = function (req, res, next) { 
    //console.log("Headers: " + req.headers);

    var obj = req.cookies;
    var cookieToken;

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            console.log("Cookie Name: " + key);
            console.log("Cookie Token: " + obj[key]);

            if(key === 'jwttoken'){
                //capture JWT token for verification
                cookieToken = obj[key];
            }
        }
    }
    console.log("HITTING IT")

    if (!cookieToken) {
        res.redirect('/login')
    } else {
        //authenticate token
        console.log("secret: " + secret.tokenSecret)
        debugger
        jwt.verify(cookieToken, secret.tokenSecret, function (err, data) {
            if (err) {
                //this is never hit due to controls in the jsonwebtoken package
                res.redirect('/login')
            } else {
                //successful authentication
                console.log("Successful authenication");
                next();
            }
        });
    }
};