$("#createEvent").on('click', ()=>{
    const event = {};
    event.event_name = $("#event_name").val().trim();
    event.start_date = $("#start_date").val().trim();
    event.end_date = $("#end_date").val().trim();
    event.start_time = $("#start_time").val().trim();
    event.end_time = $("#end_time").val().trim();

    $.ajax({
        method: "POST",
        url: "/api/events",
        data: event
      })
        .done(function( msg ) {
          alert( "Data Saved: " + msg );
        });

});