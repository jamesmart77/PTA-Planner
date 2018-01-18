var saveType;
var eventID;

$(document).ready(() => {
    $('#newEvent').modal();

    var $startDatePicker = $('#start_date').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        today: 'Today',
        clear: 'Clear',
        close: 'Ok',
        closeOnSelect: false // Close upon selecting a date,
    });

    var $endDatePicker = $('#end_date').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        today: 'Today',
        clear: 'Clear',
        close: 'Ok',
        closeOnSelect: false // Close upon selecting a date,
    });

    $('.timepicker').pickatime({
        default: 'now', // Set default time: 'now', '1:30AM', '16:30'
        fromnow: 0, // set default time to * milliseconds from now (using with default = 'now')
        twelvehour: true, // Use AM/PM or 24-hour format
        donetext: 'OK', // text for done-button
        cleartext: 'Clear', // text for clear-button
        canceltext: 'Cancel', // Text for cancel-button
        autoclose: false, // automatic close timepicker
        ampmclickable: true, // make AM PM clickable
        aftershow: function () {} //Function for after opening timepicker
    });

    saveType = "POST";



    $('#saveEvent').on('click', function () {

        var datetimerange = $("#datetime").val();

        const event = {};
        event.event_name = $('#event_name').val().trim();
        event.start_date = $('#start_date').val();
        event.start_time = $('#start_time').val();
        event.end_date = $('#end_date').val();
        event.end_time = $('#end_time').val();
        //this will only set if it's a PUT event
        if (eventID) {
            event.id = eventID;
        }

        console.log(event);


        $.ajax({
                method: saveType, //POST or PUT
                url: "/api/events",
                data: event
            })
            .done(function (msg) {
                event.event_name = $('#event_name').val("");
                event.start_date = $('#start_date').val("");
                event.start_time = $('#start_time').val("");
                event.end_date = $('#end_date').val("");
                event.end_time = $('#end_time').val("");

                // Materialize.toast('Event Saved!', 4000)

                window.location.reload();

            });



    });


    //EDIT EVENT
    $(".edit-event").on('click', function () {
        var id = $(this).data("id");

        $.ajax({
                method: "GET",
                url: "/api/events/" + id
            })
            .done(function (event) {
                console.log("EVENT INFO\n\n" + JSON.stringify(event));

                var startPicker = $startDatePicker.pickadate('picker');
                var endPicker = $endDatePicker.pickadate('picker');

                // Using a string along with the parsing format (defaults to `format` option).
                startPicker.set('select', event.start_date.split("T")[0], {
                    format: 'yyyy-mm-dd'
                });

                endPicker.set('select', event.end_date.split("T")[0], {
                    format: 'yyyy-mm-dd'
                });

                $('#event_name').val(event.event_name);
                $('#start_time').val(event.start_time);
                $('#end_time').val(event.end_time);

                saveType = "PUT";

                //set global to allow for PUT save event
                eventID = event.id;

                $('#newEvent').modal('open');
            });
    });

    //DELETE EVENT
    $(".delete-event").on('click', function () {
        var id = $(this).data("id");

        $.ajax({
                method: "DELETE",
                url: "/api/events/" + id
            })
            .done(function (event) {
                window.location.reload();
                console.log("EVENT INFO\n\n" + JSON.stringify(event));
            });

    });

    //add userid-eventid data to staging table
    //this occurs only if a user sign-up to a specific event


    $(".signup-event").on('click', function () {
        console.log("signup clicked");
        var eventid = $(this).data("id");
        var user = {
            "event_id": eventid,
            "EventId": eventid,
        };

        $.ajax({
                method: 'POST',
                url: "/api/staging",
                contentType: "application/json",
                data: JSON.stringify(user)
            })
            .done(function (event) {
                // window.location.reload();
                 Materialize.toast('Thanks for Volunteering!', 4000)
                console.log("EVENT INFO\n\n" + JSON.stringify(event));
            });

    });


});