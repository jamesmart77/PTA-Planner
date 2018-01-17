// This will test the express api routes in routes/api.js for the Event Monster APP

//1. require depencies such as assert (mocha test module) and 
// proxyrequire (to switch any DB refenerences to a mock up DB)
var assert = require('assert');
var proxyquire = require('proxyquire');
//could also require a utils file here if prefer to seperate testing to smaller files 
// var utils = require('../app/utilities/utils.js');


// Mock up  test req and res objects for the ajax api call
//describe / it / beforeEach  is mocha test group of methods
describe('checking route /api/events', function () {

    beforeEach(function () {}); //before Each allows you to run some common code before each test
    //optional call bacnk to finish the test
    it('should return a value of event ID if POST call to api/events route sucessfull', function (finish) {
        //define sequelize db object format(db.Events.create)
        var db = {
            Event: {
                create: function (event) { //checking that db.Events.create(req.body) in api.js is being called

                    return new Promise(function (resolve, reject) { //boilerplate javascrupt for returning a promise which the db.Events/create expects
                        assert.equal(event.event_name, "test event 2");
                        event.id = 3;
                        event.updatedAt = "2018-01-03T14:51:24.681Z";
                        event.createdAt = "2018-01-03T14:51:24.681Z";
                        resolve(event); //when using return new Promise you have to resolve the promise in order to return the event   
                    });
                    //console.log(event);
                }
            }
        };

        //define the express route function which will substitute the event moster db with our lcoal db object
        //using proxyrequire module
        var route = proxyquire('../routes/api.js', {
            '../models/': db
        });

        //we only want to test the POST to '/api/events', we do not want to update the DB,
        // therefore any calls from api/events to the db as specified in ../models/ is replaced via proxyquire with
        // mock up db object 
        //i.e. using proxyquire we substitute ../models/ with the local db object here 


        // var route = require ('../routes/api.js');

        var req = {
            body: {
                "event_name": "test event 2",
                "start_date": "01/01/2018",
                "end_date": "01/01/2018",
                "start_time": "14:00",
                "end_time": "16:00"
            },
            method: 'POST',
            url: '/api/events',
            headers: [],
            pause: function () {},
            resume: function () {}
        };

        // mock response

        var res = {
            json: function (data) {
                //assert.equal checks what is returned and if the event-name is "test event 2" the test will pass
                assert.equal(data.id, 3);
                finish();
            },
            status: function (status) {},
            setHeader: function () {}
        };
        console.log("testing POST to api/events");
        //call the express route function
        route(req, res);
        //can use assert.equal here but in this case not necessary as we have it in the response above
        // assert.equal(var1, '2');
    });


    //optional call back to finish the test
    it('should return a value of user ID 1 if GET call to api/users route sucessfull ', function (finish) {
        //define sequelize db object format(db.Events.create)
        // var db = {
        //     Users: {
        //         findAll: function (event) { //checking that db.Events.create(req.body) in api.js is being called

        //             return new Promise(function (resolve, reject) { //boilerplate javascrupt for returning a promise which the db.Events/create expects
        //                 assert.equal(event.event_name,"test event 2" );
        //                 event.id = 1;
        //                 event.updatedAt = "2018-01-12 04:50:40";
        //                 event.createdAt = "2018-01-03T14:51:24.681Z";
        //                 resolve(event);//when using return new Promise you have to resolve the promise in order to return the event   
        //             });
        //             //console.log(event);
        //         }
        //     }
        // };

        //define the express route function which will substitute the event moster db with our lcoal db object
        //using proxyrequire module
        var route = proxyquire('../routes/api.js', {
            // '../models/': db
        });

        //we only want to test the POST to '/api/events', we do not want to update the DB,
        // therefore any calls from api/events to the db as specified in ../models/ is replaced via proxyquire with
        // mock up db object 
        //i.e. using proxyquire we substitute ../models/ with the local db object here 


        // var route = require ('../routes/api.js');

        var req = {
            // body: {
            //     "first_name": "Louise",
            //     "last_name": "Fitzpatrick",
            //     "email": "louise@deewhy.ie",
            //     "password": "lou123",
            //     "roleID": "1"
            // },
            method: 'GET',
            url: '/api/users',
            headers: [],
            pause: function () {},
            resume: function () {}
        };

        // mock response

        var res = {
            json: function (data) {
                //assert.equal checks what is returned and if the event-name is "test event 2" the test will pass
                // assert.(data.length);
                console.log(data);
                // to add in assertion later
                finish();
            },
            status: function (status) {},
            setHeader: function () {}
        };



        console.log("testing GET to api/users");
        //call the express route function
        route(req, res);
        //can use assert.equal here but in this case not necessary as we have it in the response above
        // assert.equal(var1, '2');
    });


    it('should return a value of user ID if POST call to api/users route sucessfull', function (finish) {
        //define sequelize db object format(db.User.create)
        var db = {
            User: {
                create: function (user) { //checking that db.User.create(req.body) in api.js is being called

                    return new Promise(function (resolve, reject) { //boilerplate javascrupt for returning a promise which the db.User/create expects
                        assert.equal(user.first_name, "Adam");
                        user.id = 1;
                        resolve(user); //when using return new Promise you have to resolve the promise in order to return the event   
                    });
                    //console.log(event);
                }
            }
        };

        //define the express route function which will substitute the event moster db with our lcoal db object
        //using proxyrequire module
        var route = proxyquire('../routes/api.js', {
            '../models/': db
        });

        //we only want to test the POST to '/api/users', we do not want to update the DB,
        // therefore any calls from api/users to the db as specified in ../models/ is replaced via proxyquire with
        // mock up db object 
        //i.e. using proxyquire we substitute ../models/ with the local db object here 


        // var route = require ('../routes/api.js');

        var req = {
            body: {
                first_name: "Adam",
                last_name: "Fitzpatrick",
                email: "louise@deewhy.ie",
                password: "lou123",
                roleID: 1
            },
            method: 'POST',
            url: '/api/users',
            headers: [],
            pause: function () {},
            resume: function () {}
        };

        // mock response

        var res = {
            json: function (data) {
                //assert.equal checks what is returned and if the user first_name is "Adam" the test will pass
                assert.equal(data.id, 1);
                finish();
            },
            status: function (status) {},
            setHeader: function () {}
        };
        console.log("testing POST to api/users");
        //call the express route function
        route(req, res);
        //can use assert.equal here but in this case not necessary as we have it in the response above
        // assert.equal(var1, '2');
    });





});