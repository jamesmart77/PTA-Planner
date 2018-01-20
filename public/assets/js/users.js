$(document).ready(function () {
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
    $('select').material_select();
    // Materialize.updateTextFields();
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
    user.email = ""; //obtain this from jwtauth cookies on server side in api.js /api/users
    user.password = ""; //obtain this from jwtauth cookies on server side in api.js /api/users
    var roleID = $('.select-dropdown').val().trim();
    if (roleID === "Admin") {
        user.roleID = 2;
    } else {
        user.roleID = 1;
    }
    // user.roleID = 1;//1 to volunteer role 2 Admin Role
    var active = $('#switch').val().trim();
    if (active === "on") {
        user.active = true;
    } else {
        user.active = false;
    }

    $.ajax({
        method: 'POST',
        url: "/api/users",
        contentType: "application/json",
        data: JSON.stringify(user)
    }).done(function (data) {
        console.log(data);
        location.reload(); //show user
        //catch block to ensure if invalid data input the app does not crash
    }).catch(function (err) {
        console.log(err);

    });

});