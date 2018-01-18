//require dependencies here
var assert = require('assert');
var proxyquire = require('proxyquire');
const db = require('../models/')
var route = require('../routes/api.js');


// E.G......to be replaced with your dependencies
// const db = require('../models/');


describe('Should add a user to event', function () {
    beforeEach(function () {

    });

    it('should add user to event', function (finish) {
        // mock up req and res
        console.log("add user to event");
        var req = {
            body: {

                "event_id": 1,
                "user_id": 1,
                "EventId":1,
                "UserId":1

            },
            method: 'POST',
            url: '/api/staging',
            headers: [],
            pause: function () {},
            resume: function () {}
        };
        //define sequelize db object format(db.Staging.create)
        var db = {
            Staging: {
                create: function (staging) { //checking that db.User.create(req.body) in api.js is being called
                    return new Promise(function (resolve, reject) { //boilerplate javascrupt for returning a promise which the db.User.create expects
                        assert.equal(staging.event_id, 1);
                        staging.user_id = 1;
                        resolve(staging); //when using return new Promise you have to resolve the promise in order to return the user   
                    });
                    //console.log(user);
                }
            }
        };

        // var route = proxyquire('../routes/api.js', {
        //     '../models/': db
        // });

        var res = {
            json: function (data) {
                //assert.equal checks what is returned and if the user first_name is "Tom" the test will pass
                // assert.equal(data.id, 1);
                finish();
            },
            status: function (status) {},
            setHeader: function () {}
        };
        console.log("testing POST to api/staging");
        //call the express route function
        route(req, res);
    });
});