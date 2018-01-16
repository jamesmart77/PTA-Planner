
$(document).ready(()=>{
    $('#newEvent').modal({
        complete : createEvent
    });

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        today: 'Today',
        clear: 'Clear',
        close: 'Ok',
        closeOnSelect: false // Close upon selecting a date,
    });
    
    $('.timepicker').pickatime({
        default: 'now', // Set default time: 'now', '1:30AM', '16:30'
        fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
        twelvehour: false, // Use AM/PM or 24-hour format
        donetext: 'OK', // text for done-button
        cleartext: 'Clear', // text for clear-button
        canceltext: 'Cancel', // Text for cancel-button
        autoclose: false, // automatic close timepicker
        ampmclickable: true, // make AM PM clickable
        aftershow: function () { } //Function for after opening timepicker
    });
});

function createEvent(){

    var datetimerange = $("#datetime").val();

    const event = {};
    event.event_name = $('#event_name').val().trim();
    event.start_date = $('#start_date').val();
    event.start_time = $('#start_time').val();
    event.end_date = $('#end_date').val();
    event.end_time = $('#end_time').val();

    console.log(event);


    $.ajax({
        method: "POST",
        url: "/api/events",
        data: event
    })
    .done(function (msg) {
        event.event_name = $('#event_name').val("");
        event.start_date = $('#start_date').val("");
        event.start_time = $('#start_time').val("");
        event.end_date = $('#end_date').val("");
        event.end_time = $('#end_time').val("");

    });
    $("#events-table tbody").append(
        `<tr>
        <td>${event.event_name}</td>
        <td>${event.start_date}</td>
        <td>${event.start_time}</td>
        <td>${event.end_date}</td>
        <td>${event.end_time}</td>
        </tr>`
    )

    Materialize.toast('Event Saved!', 4000)
    console.log(msg);

};

$(".edit-event").on('click', function () {
    var id = $(this).data("id");

    $.ajax({
            method: "GET",
            url: "/api/events/" + id
        })
        .done(function (event) {
            console.log("EVENT INFO\n\n" + JSON.stringify(event))
        });
});
