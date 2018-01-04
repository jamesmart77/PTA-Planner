// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
    var token = getCookie('jwttoken');

    if (token) {
        //hijack all ajax requests to include the following header
        $.ajaxSetup({
            headers: {
                'Authorization': "Bearer " + token
            }
        });
    }
});

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}