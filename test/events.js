var assert = require('assert');
const db = require('../models/')
// var utils = require('../app/utilities/utils.js');
// var apiRoutes = require('../app/routes/apiRoutes.js');

describe('events model test', function () {
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
        console.log(db['Events']);
        db.Events.create(event);
        assertequal(1,1);
    });

});