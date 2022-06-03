
var main = function () {
    'use strict';

    var new_username = "";
    var new_userid = "";

    function showAllUsers() {
        $.getJSON("/users.json", function (userObjects) {
            var $table = $('<table>'),
                $tr = $('<tr>'),
                $th_username = $('<th>').addClass('info').text("Username:").attr({ width: "50%" }),
                $th_id = $('<th>').addClass('info').text("ID:").attr({ width: "40%" });
            $tr.append($th_username);
            $tr.append($th_id);
            $tr.append($('<th>'));
            $table.append($tr);

            userObjects.forEach(function (user) {
                $tr = $('<tr>');
                var $username = $('<td>').text(user.username),
                    $userid = $('<td>').text(user.id),
                    $userRemoveLink = $('<a>').attr("href", "users/" + user.username);
                $userRemoveLink.text("Удалить");

                $userRemoveLink.on("click", function () {
                    $.ajax({
                        "url": "users/" + user.username,
                        "type": "DELETE"
                    }).done(function (response) {
                        showAllUsers();
                    }).fail(function (err) {
                        console.log("Error on delete 'user'!");
                    });
                    return false;
                });

                $tr.append($username);
                $tr.append($userid);
                $tr.append($userRemoveLink);
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
