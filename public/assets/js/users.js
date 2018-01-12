$("#create-user").on("click", function (event) {
    event.preventDefault();

    $.ajax({
        method: 'GET',
        url: "/api/users",
        contentType: "application/json"
    }).done(function (data) {
        console.log(data);

        var results = data[0];
        $("#response").text(results.first_name);
        $("#response").append("hi");
        $("#response").show();
        var template = Handlebars.compile(results);
        $('#response').html(template);

    });

});