var userID;

$(document).ready(() => {
    console.log("in user show")
    $('.modal-trigger').hide(); //hiding 'New User' button

    //modal1 is the create user modal
    $('#modal1').modal();
    $('select').material_select();

    $('#create-user').on('click', function () {

        const user = {};
        user.first_name = $('#first_name').val().trim();
        user.last_name = $('#last_name').val();
        user.email = $('#modal-email').val();
        user.password = $('#password').val();

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

        //this will only set if it's a PUT event
        if (userID) {
            user.id = userID;
        }

        console.log("NEW INFO\n" + user);

        $.ajax({
                method: "PUT", //POST or PUT
                url: "/api/users",
                data: user
            })
            .done(function () {
                //update elements without reloading page
                $('#first-name').text(user.first_name);
                $('#last-name').text(user.last_name);
                $('#email').text(user.email);

                //check role type
                if (roleVal) {
                    //admin
                    $('#role-id').text("Admin");
                } else {
                    //user
                    $('#role-id').text("User");
                }

                //check status
                if (activeVal) {
                    $('#active-status').text("Active");
                } else {
                    $('#active-status').text("Disabled");
                }

                Materialize.toast('User Saved!', 4000)

            });
    });


    //EDIT USER
    $(".edit-user").on('click', function () {
        var id = $(this).data("id");

        $.ajax({
                method: "GET",
                url: "/api/users/" + id
            })
            .done(function (user) {
                // console.log("USER INFO\n\n" + JSON.stringify(user));

                $('#first_name').val(user.first_name);
                $('#last_name').val(user.last_name);
                $('#modal-email').val(user.email);
                $('#password').val(user.password);
                // $('.role-id').val(user.roleID);

                var roleID = user.roleID
                console.log("here" + user.roleID)

                //switch on/off based on role type
                if (user.roleID === 1) {
                    //user
                    document.getElementById("role-switch").checked = false;
                } else {
                    //admin
                    document.getElementById("role-switch").checked = true;
                }

                //switch on/off based on active status
                if (user.active) {
                    //active
                    document.getElementById("active-switch").checked = true;
                } else {
                    //disabled
                    document.getElementById("active-switch").checked = false;
                }

                //set global to allow for PUT save event
                userID = user.id;

                $('#modal1').modal('open');

            });
    });

});

function togglePassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}