//Behaviour Driven Development
//Writing the Code to pass these tests
//This is a Cucumber
'use strict';


var assert = require("assert");
var defineSupportCode = require('cucumber').defineSupportCode;

defineSupportCode(function (context) {
    var Given = context.Given;
    var When = context.When;
    var Then = context.Then;
    var Before = context.Before;
    var registerHandler = context.registerHandler;
    var event;

    registerHandler('BeforeScenario', function (features, callback) {
        event = {
            event_name: "test event 2",
            start_date: "01/01/2018",
            end_date: "01/01/2018",
            start_time: "14:00",
            end_time: "16:00"
        };
        callback();
    });
    Given('I have an Event', function (callback) {
        // Write code here that turns the phrase above into concrete actions
        assert.equal(event.event_name, 'test event 2')
        callback();
    });
    When('I add a User to an Event', function (callback) {
        // Write code here that turns the phrase above into concrete actions

        callback(null, 'pending');
      });

});