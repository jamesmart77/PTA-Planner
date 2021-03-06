// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {

    $(".create-form").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        //assign form credentials to variable object
        var credentials = {
            email: $("#email").val().trim(),
            password: $("#password").val().trim()
        };

        // current base url address
        var currentURL = window.location.origin;

        // post request for user entries
        $.post(currentURL + "/api/login", credentials, function (response) {
            //return with token
            console.log(response);

            //redirect to /events page
            window.location = currentURL + "/events";
        });
    });
});