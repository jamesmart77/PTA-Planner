var jwt = require('jsonwebtoken');
var expressJWT = require('express-jwt');
var secret = require('../config/secrets.js');

// console.log("anything...")
//middleware to validate token
module.exports = function (req, res, next) { 
    //console.log("Headers: " + req.headers);

    var obj = req.cookies;

    console.log("OBJECT " + JSON.stringify(obj));
    debugger
    var cookieToken;

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            console.log("Cookie Name: " + key);
            console.log("Cookie Token: " + obj[key]);
debugger
            if(key === 'jwttoken'){
                //capture JWT token for verification
                cookieToken = obj[key];
            }
        }
    }
    console.log("HITTING IT")

    if (!cookieToken) {
        console.log("COMING BACK")
        res.redirect('/login')
    } else {
        //authenticate token
        console.log("secret: " + secret.tokenSecret)
       
        jwt.verify(cookieToken, secret.tokenSecret, function (err, data) {
            if (err) {
                //this is never hit due to controls in the jsonwebtoken package
                res.redirect('/login')
            } else {
                var decoded = jwt.decode(cookieToken);


                // console.log("Decoded: " + JSON.stringify(decoded));
                console.log("Email: " + decoded.email);
                console.log("Password: " + decoded.password);

                //successful authentication
                console.log("Successful authenication");
                next();
            }
        });
    }
};