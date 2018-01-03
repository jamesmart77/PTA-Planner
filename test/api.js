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
    it('should return a value of event ID if api/events route sucessfull ', function (finish) {
        //define sequelize db object format(db.Events.create)
        var db = {
            Events: {
                create: function (event) { //checking that db.Events.create(req.body) in api.js is being called

                    return new Promise(function (resolve, reject) { //boilerplate javascrupt for returning a promise which the db.Events/create expects
                        assert.equal(event.event_name,"test event 2" );
                        event.id = 3;
                        event.updatedAt = "2018-01-03T14:51:24.681Z";
                        event.createdAt = "2018-01-03T14:51:24.681Z";
                        resolve(event);//when using return new Promise you have to resolve the promise in order to return the event   
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



        console.log("testing api/events");
        //call the express route function
        route(req, res);
        //can use assert.equal here but in this case not necessary as we have it in the response above
        // assert.equal(var1, '2');
    });

});