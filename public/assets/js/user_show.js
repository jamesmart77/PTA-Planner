


// Initialize Firebase
var config = {
    apiKey: "AIzaSyBdvzDGVlb8w6es6yBOacj8n7TTkvVmoCA",
    authDomain: "group-project-1-8353f.firebaseapp.com",
    databaseURL: "https://group-project-1-8353f.firebaseio.com",
    projectId: "group-project-1-8353f",
    storageBucket: "group-project-1-8353f.appspot.com",
    messagingSenderId: "653234238699"
};
firebase.initializeApp(config);

var userID;

$(document).ready(() => {
    const pwDiv = document.getElementById('passwordStuff');

    pwDiv.style.display = 'none';
    
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
        user.imgUrl = $('#profile-img').val();

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

        if($("#updatePassword").is(":checked")){
            if($('#password').val()===$('#confirmPassword').val()){
                user.oldPassword = $('#oldPassword').val();
                user.password = $('#password').val();
            }
            else {
                alert("Your passwords don't match, that could be a huge problem");
            }
        }

        console.log("NEW INFO\n");
        console.log(user);

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
                console.log("USER INFO\n\n" + JSON.stringify(user));

                $('#first_name').val(user.first_name);
                $('#last_name').val(user.last_name);
                $('#modal-email').val(user.email);
                $('#profile-img').val(user.imgUrl);

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

    //View USER
    $(".event-see").on('click', function () {

        var id = $(this).data("eventid");

        // current base url address
        window.location.href = window.location.origin + "/events/" + id

    });

    //View USER
    $(".back-user").on('click', function () {

        // var id = $(this).data("eventid");

        // current base url address
        window.location.href = "/users/";

    });


    $('#updatePassword').on('click', function(){
        var display = $("#updatePassword").is(":checked");
        pwDiv.style.display = display ? 'block' : 'none';

            
        
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

function facebookAuth() {
    var provider = new firebase.auth.FacebookAuthProvider();

    console.log("facebook auth begun...")
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        // console.log("USER: " + JSON.stringify(user));

        var name = user.displayName;
        var photoURL = user.photoURL;

        // sessionStorage.setItem("userName", name)
        // sessionStorage.setItem("photoURL", photoURL)

        $("#profile-img").val(photoURL);
        console.log("userName: " + name);
        console.log("photoURL: " + photoURL);

        // redirect to survey page
        // toSurvey();
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        console.log("ERROR\n")
        console.log("Error Message\n" + errorMessage + "\n\n")
        console.log("Error Code\n" + errorCode + "\n\n")
        console.log("Error Email\n" + email + "\n\n")
        console.log("Error Credential\n" + credential + "\n\n")

        // $("#login-error").show();
        // ...
    });
}

