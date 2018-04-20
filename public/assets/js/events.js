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
        event.start_time = convertTime12to24($('#start_time').val());
        event.end_date = $('#end_date').val();
        event.end_time = convertTime12to24($('#end_time').val());
        event.imgUrl = $('#img_url').val();
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
                // test for an error
                if(msg.errors){
                    Materialize.toast(msg.errors[0].message, 4000);
                }
                else{
                    console.log(msg);
                    window.location.reload();
                }
               

            });



    });


    //View EVENT
    $(".event-see").on('click', function () {
        var id = $(this).data("id");

        // current base url address
        var currentURL = window.location.origin;

        // alert(currentURL)
        //redirect to /events page
        window.location = currentURL + "/events/" + id;
       
    });

    //DELETE EVENT
    $(".event-delete").on('click', function () {
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


    $(".event-signup").on('click', function () {
        console.log("signup clicked");
        var eventid = $(this).data("id");
        var user = {
            // "event_id": eventid,
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
                 Materialize.toast('Thanks for Volunteering!', 4000);
                console.log("EVENT INFO\n\n" + JSON.stringify(event));
            });

    });


});



function convertTime12to24(time12h) {
    const [time, modifier] = time12h.includes("AM") ? 
       time12h.split('AM')
        .map((res => res ? res : "AM")) 
        :
        time12h.split('PM')
        .map((res => res ? res : "PM"));
    
      let [hours, minutes] = time.split(':');
    
      if (hours === '12') {
        hours = '00';
      }
    
      if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
      }
    
      return `${hours}:${minutes}:00`;
    }