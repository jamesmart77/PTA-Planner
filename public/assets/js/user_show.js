var userID;

$(document).ready(() => {
    console.log("in user show")
    $('.modal-trigger').hide(); //hiding 'New User' button

    $('#modal1').modal();
    $('select').material_select();

    $('#create-user').on('click', function () {

        const user = {};
        user.first_name = $('#first_name').val().trim();
        user.last_name = $('#last_name').val();
        user.email = $('#email').val();
        user.password = $('#password').val();
        user.roleID = $('#roleID').val();
        user.active = $('#active').val();
        //this will only set if it's a PUT event
        if (userID) {
            user.id = userID;
        }

        console.log(user);


        $.ajax({
                method: "PUT", //POST or PUT
                url: "/api/users",
                data: user
            })
            .done(function () {
                //update elements without reloading page
                $('#first_name').text(usert.first_name);
                $('#last_name').text(user.last_name);
                $('#email').text(user.email);
                $('#password').text(user.password);
                $('#roleID').text(user.roleID);
                $('#active').text(user.active);

                Materialize.toast('User Saved!', 4000)

            });
    });


    //EDIT EVENT
    $(".edit-user").on('click', function () {
        var id = $(this).data("id");

        $.ajax({
                method: "GET",
                url: "/api/users/" + id
            })
            .done(function (user) {
                console.log("USER INFO\n\n" + JSON.stringify(user));

                // var startPicker = $startDatePicker.pickadate('picker');
                // var endPicker = $endDatePicker.pickadate('picker');

                // // Using a string along with the parsing format (defaults to `format` option).
                // startPicker.set('select', event.start_date.split("T")[0], {
                //     format: 'yyyy-mm-dd'
                // });

                // endPicker.set('select', event.end_date.split("T")[0], {
                //     format: 'yyyy-mm-dd'
                // });

                $('#first_name').val(user.first_name);
                $('#last_name').val(user.last_name);
                $('#email').val(user.email);
                $('#password').val(user.password);
                $('#roleID').val(user.roleID);
                $('#active').val(user.active);

                //set global to allow for PUT save event
                userID = user.id;

                $('#modal1').modal('open');
            });
    });

    // //DELETE EVENT
    // $(".delete-event").on('click', function () {

    //     var answer = confirm("Are you sure?");

    //     //if yes
    //     if (answer) {
    //         var id = $(this).data("id");

    //         // current base url address
    //         var currentURL = window.location.origin;

    //         $.ajax({
    //                 method: "DELETE",
    //                 url: "/api/events/" + id
    //             })
    //             .done(function (event) {
    //                 //redirect to events pages
    //                 window.location = currentURL + "/events";
    //             });
    //     }
    // });

    // //DELETE USER FROM EVENT
    // $(".user-delete").on('click', function () {

    //     var answer = confirm("Are you sure?");

    //     //if yes
    //     if (answer) {

    //         var eventPath = window.location.pathname.split("/");
            
    //         var eventID = eventPath[eventPath.length-1];

    //         var event_user = {
    //             eventId: eventID,
    //             userId: $(this).data("userid")
    //         }

    //         // current base url address
    //         // var currentURL = window.location.origin;

    //         $.ajax({
    //                 method: "DELETE",
    //                 url: "/api/staging/",
    //                 data: event_user
    //             })
    //             .done(function (event) {
    //                 //refresh page
    //                 window.location.reload();
    //             });
    //     }
    // });


});