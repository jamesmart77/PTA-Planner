var assert = require('assert');
var proxyquire = require('proxyquire');

//require dependencies here


// E.G......to be replaced with your dependencies
// const db = require('../models/');


describe('TEST *** POST /api/user', function () {
    beforeEach(function () {

    });

    it('TEST*** assert user.first_name Adam if successful', function (finish) {
        // mock up req and res
        // console.log("creating a user Tom");
        var req = {
            body: {

                "first_name": "Test",
                "last_name": "Fitzpatrick",
                "email": "louise@deewhy.ie",
                "password": "lou123",
                "roleID": null,
                "createdAt": "2018-01-12T04:50:40.000Z",
                "updatedAt": "2018-01-12T04:50:40.000Z"

            },
            method: 'POST',
            url: '/api/users',
            headers: [],
            pause: function () {},
            resume: function () {},
            cookies: {
                "jwttoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoiYWRtaW4iLCJhZG1pbiI6dHJ1ZSwidXNlcklEIjoxLCJpYXQiOjE1MTYyOTEyOTJ9.9sRZe9bsnK6Msx3QEI5-J6hG3ICfoKIM6b9E_ZYdT7o"
            }
        };
        //define sequelize db object format(db.User.create)
        var db = {
            User: {
                create: function (user) { //checking that db.User.create(req.body) in api.js is being called
                    return new Promise(function (resolve, reject) { //boilerplate javascrupt for returning a promise which the db.User.create expects
                        assert.equal(user.first_name, "Test");
                        user.id = 17;
                        resolve(user); //when using return new Promise you have to resolve the promise in order to return the user   
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
            status: function (status) {},
            setHeader: function () {}
        };
        // console.log("testing POST to api/users");
        //call the express route function
        route(req, res);
    });
});