
var main = function () {
    // 'use strict';

    var new_description = "";
    var new_tags = "";


    $('.tabs a span').toArray().forEach(function (element) {
        $(element).on('click', function () {
            var $element = $(element);
            var $content;

            $('.tabs a span').removeClass('active');
            $element.addClass('active');
            $('main .content').empty();

            function showToDos(todo) {
                var $todoListItem = $("<li>").text(todo.description),
                    $todoRemoveLink = $("<a>").attr("href", "todos/" + todo._id);
                $todoRemoveLink.text("Удалить");

                $todoRemoveLink.on("click", function () {
                    $.ajax({
                        "url": "todos/" + todo._id,
                        "type": "DELETE"
                    }).done(function (response) {
                        $(".tabs a:first-child span").trigger("click");
                    }).fail(function (err) {
                        console.log("error on delete 'todo'!");
                    });
                    return false;
                });

                $todoListItem.append($todoRemoveLink);
                $content.append($todoListItem);
            };


            if ($element.parent().is(':nth-child(1)')) {
                $.getJSON("todos.json", function (toDoObjects) {
                    $content = $('<ul>');
                    for (var i = (toDoObjects.length - 1); i > -1; i--) {
                        showToDos(toDoObjects[i]);
                    }
                    $('main .content').append($content);
                });

            } else if ($element.parent().is(':nth-child(2)')) {
                $.getJSON("todos.json", function (toDoObjects) {
                    $content = $('<ul>')
                    toDoObjects.forEach(function (todo) {
                        showToDos(todo);
                    });
                    $('main .content').append($content);
                });

            } else if ($element.parent().is(':nth-child(3)')) {
                $.getJSON("todos.json", function (toDoObjects) {
                    var organizedByTag = organizeByTags(toDoObjects);

                    organizedByTag.forEach(function (tag) {
                        var $tagName = $("<h3>").text(tag.name);
                        $content = $("<ul>");
    
                        tag.toDos.forEach(function (description) {
                            var $li = $("<li>").text(description);
                            $content.append($li);
                        });
    
                        $("main .content").append($tagName);
                        $("main .content").append($content);
                    });
                });

            } else if ($element.parent().is(':nth-child(4)')) {
                $content = $('<form>');
                $content.append($("<h4>").text("Описание"));
                $content.append($('<input>').attr({
                    type: 'text',
                    placeholder: 'Введите описание задачи..',
                    value: new_description,
                    id: 'new_description'
                }));
                $content.append($("<h4>").text("Категории"));
                $content.append($('<input>').attr({
                    type: 'text',
                    placeholder: 'Введите категории задачи..',
                    value: new_tags,
                    id: 'new_tags'
                }));
                $content.append($('<button>').addClass('add_toDo'));
                $("main .content").append($content);

            }

            return false;
        });
    });

    // обработчики изменений строк в input
    $('main .content').on('change', '#new_description', function () {
        new_description = $('#new_description').val();
        return false;
    });

    $('main .content').on('change', '#new_tags', function () {
        new_tags = $('#new_tags').val();
        return false;
    });

    // обработчик нажатия кнопки добавления
    $('main .content').on('click', '.add_toDo', function () {
        if (new_description != "") {
            var tags = new_tags.split(", ");
            if (tags.length != 0) {
                var newToDo = { "description": new_description, "tags": tags };

                // этот обратный вызов выполняется при ответе сервера
                $.post("todos", newToDo, function (response) {
                    // toDoObjects.push(newToDo);
                });

                $('#new_description').val("");
                new_description = "";
                $('#new_tags').val("");
                new_tags = "";
            }
        }

        return false;
    });


    $('.tabs a:first-child span').trigger('click');

}


$(document).ready(function () {
    main();
});
