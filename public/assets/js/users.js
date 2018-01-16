$(document).ready(function () {
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
});


$("#create-user").on("click", function (user) {
    // prevent default window reload
    event.preventDefault();
    console.log("user create clicked");

    var user = {};
    user.first_name = $('#first_name').val().trim();
    user.last_name = $('#last_name').val().trim();
    user.email = $('#email').val().trim();
    user.password = "";
    user.roleID = 1;

    // mock up user as no form submitt in place in handlebars file
    // var user = {

    //     first_name: "Test",
    //     last_name: "Fitzpatrick",
    //     email: "louise@deewhy.ie",
    //     password: "lou123",
    //     roleID: null,
    //     createdAt: "2018-01-12T04:50:40.000Z",
    //     updatedAt: "2018-01-12T04:50:40.000Z"

    // };

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