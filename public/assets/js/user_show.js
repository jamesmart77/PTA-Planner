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


    //EDIT USER
    $(".edit-user").on('click', function () {
        var id = $(this).data("id");

        $.ajax({
                method: "GET",
                url: "/api/users/" + id
            })
            .done(function (user) {
                console.log("USER INFO\n\n" + JSON.stringify(user));

                $('#first_name').val(user.first_name);
                $('#last_name').val(user.last_name);
                $('#email').val(user.email);
                $('#password').val(user.password);
                $('#role-id').val(user.roleID);

                var roleID = user.roleID
                console.log("here" + user.roleID)
                
                // if (roleID === "ADMIN") {
                //     $('#role-id').val("Admin");
                // }

                // else {
                //     $('#roleID').val("Volunteer");
                // }
                
                $('#active').val(user.active);

                //set global to allow for PUT save event
                userID = user.id;

                $('#modal1').modal('open');
            });
    });

    


});