// Demo Script: This will test the express api routes in routes/api.js for the Event Monster APP
// require dependencies : assert (mocha test module - This is a tool to assert properties of responses to requests, such as the body, headers, and status code. )  
// proxyrequire (to switch any route db references to a mock up db)
var assert = require('assert');
var proxyquire = require('proxyquire');
const db = require('../models/')
var route = require('../routes/api.js');

describe('TEST POST /api/staging to add a user to event', function () {
    beforeEach(function () {
        
    });

    it('should add user to event', function (finish) {
        // mock up req and res for the ajax api call
        // console.log("add user to event");
        var req = {
            body: {
                "EventId":1,
                "UserId":1

            },
            method: 'POST',
            url: '/api/staging',
            // headers: [],
            // pause: function () {}, //Pauses request from emitting events. Useful to throttle back an upload.
            // resume: function () {}, //Resumes a paused request.
            cookies: {
                "jwttoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoiYWRtaW4iLCJhZG1pbiI6dHJ1ZSwidXNlcklEIjoxLCJpYXQiOjE1MTYyOTEyOTJ9.9sRZe9bsnK6Msx3QEI5-J6hG3ICfoKIM6b9E_ZYdT7o"
            }
            
        };

        

        //define sequelize db object format(db.Staging.create)
        var db = {
            Staging: {
                create: function (staging) { //checking that db.User.create(req.body) in api.js is being called
                    return new Promise(function (resolve, reject) { //boilerplate javascrupt for returning a promise which the db.Staging.create api gives back
                        assert.equal(staging.EventId, 1);  //assert.equal checks what is returned and if the EventId === 1  the test will pass
                        resolve(staging); // if successful: when using return new Promise you have to resolve the promise in order to return the user   
                    });
                    //console.log(user);
                }
            }
        };

        var route = proxyquire('../routes/api.js', {
            '../models/': db
        });

        var res = {
            json: function (data) {
                //assert.equal checks what is returned and if the user first_name is "Tom" the test will pass
                // assert.equal(data.id, 1);
                finish();
            },
            // status: function (status) {},//Sets a single header value for implicit headers. (name, value), "Content-Type", "text/html"
            // setHeader: function () {}
        };
        // console.log("testing POST to api/staging");
        //call the express route function
        route(req, res);
    });
});