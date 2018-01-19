$(document).ready(function () {
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
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
    user.email = $('#email').val().trim();
    user.password = "";//obtain this from jwtauth cookies on server side in api.js /api/users
    user.roleID = 1;//default to volunteer role
    user.active = 0;

    
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