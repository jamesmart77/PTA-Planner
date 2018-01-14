//This file tests the DB config defined in /models/- acceptance testing
var assert = require('assert');
const db = require('../models/')


//test to check events model 
describe('events modal test', function () {
    beforeEach(function () {


    });

    it('should ', function () {

        var event = {
            event_name: 'test event',
            start_date: '01/01/2018',
            end_date: '01/01/2018',
            start_time: '14:00',
            end_time: '16:00'
        }
        console.log(db['Event']);
        db.Event.create(event)
            .catch(function (err) {
                console.log(err);
            })
    });

    it('should create a users', function () {

        var user = {
            first_name: "Adam",
            last_name: "Fitzpatrick",
            email: "louise@deewhy.ie",
            password: "lou123",
            roleID: 1
        }
        console.log(db['User']);
        db.User.create(user)
            .then( result => {
                console.log(result);
            })
            .catch(function (err) {
                console.log(err);
            })
    });

});