var assert = require('assert');

//require dependencies here


// E.G......to be replaced with your dependencies
const db = require('../models/');

// var utils = require('../app/utilities/utils.js');
// var apiRoutes = require('../app/routes/apiRoutes.js');

describe('Should create a user', function () {
    beforeEach(function () {

    });

    it('should ', function () {
        
            console.log("creating a user Tom");
            var data = {

                first_name: "Test",
                last_name: "Fitzpatrick",
                email: "louise@deewhy.ie",
                password: "lou123",
                roleID: null,
                createdAt: "2018-01-12T04:50:40.000Z",
                updatedAt: "2018-01-12T04:50:40.000Z"

            };

            $.ajax({
                method: 'POST',
                url: "/api/users",
                contentType: "application/json",
                data: data
            }).done(function (data) {
                console.log(data);
                res.json(data);
                //catch block to ensure if invalid data input the app does not crash
            }).catch(function (err) {
                res.json(err);

                // var results = data[0];

                // $("#response").text(JSON.stringify(results));
                // $("#response").show();

                // var template = Handlebars.compile(results);
                // $('#response').html(template);

            });

    });
});