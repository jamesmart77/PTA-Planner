// //This file tests the DB config defined in /models/- acceptance testing sample
// var assert = require('assert');
// const db = require('../models/')


// //test to check events model 
// describe('TEST: Integration test of events and users models ', function () {
//     beforeEach(function () {
//     });

//     it(' should create an event in events table', function () {

//         var event = {
//             event_name: 'test event',
//             start_date: '01/01/2018',
//             end_date: '01/01/2018',
//             start_time: '14:00',
//             end_time: '16:00'
//         }
//         //console.log(db['Event']);
//         db.Event.create(event).then({
//             function(data) {
//                 assert.equal(data.event_name, "test event")
//             }
//         }).catch(function (err) {
//                 // console.log(err);
//             })
//     });

//     it('TEST***  should create a user in users table', function () {

//         var user = {
//             first_name: "Adam",
//             last_name: "Fitzpatrick",
//             email: "louise@deewhy.ie",
//             password: "lou123",
//             roleID: 1
//         }
//         //console.log(db['User']);
//         db.User.create(user)
//             .then( result => {
//                // console.log(result);
//             })
//             .catch(function (err) {
//                 // console.log(err);
//             })
//     });

// });