
var main = function () {
    'use strict';

    var new_username = "";
    var new_userid = "";

    function showAllUsers() {
        $.getJSON("/users.json", function (userObjects) {
            var $table = $('<table>'),
                $tr = $('<tr>'),
                $th_username = $('<th>').text("Username:").attr({ width: "60%" }),
                $th_id = $('<th>').text("ID:");
            $tr.append($th_username);
            $tr.append($th_id);
            $table.append($tr);

            userObjects.forEach(function (user) {
                $tr = $('<tr>');
                var $username = $('<td>').text(user.username),
                    $userid = $('<td>').text(user.id);

                $tr.append($username);
                $tr.append($userid);
                $table.append($tr);
            });

            $('.all_users').empty();
            $('.all_users').append($table);
        });
    }

    // обработчики изменений строк в input
    $('main .add_new_user').on('change', '#new_username', function () {
        new_username = $('#new_username').val();
        return false;
    });

    $('main .add_new_user').on('change', '#new_userid', function () {
        new_userid = $('#new_userid').val();
        return false;
    });

    // обработчик нажатия кнопки добавления
    $('main .add_new_user').on('click', '#add_new_user_link', function () {
        if (new_username != "") {
            var newUser = { "username": new_username, "id": new_userid };

            // этот обратный вызов выполняется при ответе сервера
            $.post("/users", newUser, function (response) {
                showAllUsers();
            });

            $('#new_username').val("");
            new_username = "";
            $('#new_userid').val("");
            new_userid = "";
        }

        return false;
    });

    showAllUsers();
}


$(document).ready(function () {
    main();
});
