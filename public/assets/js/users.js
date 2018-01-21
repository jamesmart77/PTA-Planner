$(document).ready(function () {
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
    $('select').material_select();
    // Materialize.updateTextFields();

    $(".user-see").on('click', function () {
        var id = $(this).data("id");
        console.log("user see working")

        // current base url address
        var currentURL = window.location.origin;

        // alert(currentURL)
        //redirect to /events page
        window.location = currentURL + "/users/" + id;
    });

    //when create user button is clicked
    $("#create-user").on("click", function (user) {
        // prevent default window reload
        event.preventDefault();
        console.log("user create clicked");
        // create object to store user data to send with the AJAX post
        var user = {};
        // populate user data captured in the modal from the partials users.create.handlebars 
        user.first_name = $('#first_name').val().trim();
        user.last_name = $('#last_name').val().trim();
        // user.email = $('#email').val().trim();
        user.email = $('#modal-email').val().trim();; //obtain this from jwtauth cookies on server side in api.js /api/users
        user.password = $('#password').val().trim();; //obtain this from jwtauth cookies on server side in api.js /api/users

        var roleVal = $('#role-switch:checked').val();
        var activeVal = $('#active-switch:checked').val();

        //check role type
        if (roleVal) {
            //admin
            user.roleID = 2
        } else {
            //user
            user.roleID = 1
        }

        //check status
        if (activeVal) {
            user.active = true
        } else {
            user.active = false
        }

        $.ajax({
            method: 'POST',
            url: "/api/users",
            contentType: "application/json",
            data: JSON.stringify(user)
        }).done(function (data) {
            console.log(data);
            if (!data.errors) {
                location.reload(); //show user
            } else {
                // handle db validation errors
                Materialize.toast(data.errors[0].message, 4000);
            }
            //catch block to ensure if invalid data input the app does not crash
        }).catch(function (err) {
            console.log(err);

        });

    });
});

//make password field visible or hidden
function togglePassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}