$(function () {

    $(function () {
        $('input[name="daterange"]').daterangepicker({
            timePicker: true,
            timePickerIncrement: 15,
            locale: {
                format: 'YYYY-MM-DD HH:mm:SS'
            }
        });
    });

    $("#createEvent").on('click', () => {

        var datetimerange = $("#datetime").val();

        const event = {};
        event.event_name = $('#event_name').val().trim();
        event.start_date = datetimerange.split(' - ')[0].split(" ")[0];
        event.start_time = datetimerange.split(' - ')[0].split(" ")[1];
        event.end_date = datetimerange.split(' - ')[1].split(" ")[0];
        event.end_time = datetimerange.split(' - ')[1].split(" ")[1];

        $.ajax({
                method: "POST",
                url: "/api/events",
                data: event
            })
            .done(function (msg) {
                alert("Data Saved: " + msg);
            });

    });

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
})