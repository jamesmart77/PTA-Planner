//This file tests the DB config defined in /models/- acceptance testing
var assert = require('assert');
const db = require('../models/')


//test to check events model 
describe('events modal test', function () {
    beforeEach(function () {


    });

    it('should ', function () {
        
        var event = {
            blah: 'test event',
            start_date: 'dfdf',
            end_date: '01/01/2018',
            start_time: '14:00',
            end_time: '16:00'
        }
        console.log(db['Events']);
        db.Events.create(event)
        .catch(function(err){
            console.log(err);
        })
    });

});