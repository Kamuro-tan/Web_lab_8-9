
var User = require("../models/user.js"),
    mongoose = require("mongoose");

// проверка, не существует ли уже пользователь
User.find({}, function (err, result) {
    if (err !== null) {
        console.log("Ошибка поиска в базе данных.");
        console.log(err);
    } else if (result.length === 0) {
        console.log("Создание тестового пользователя...");
        var exampleUser = new User({ 
            "username": "usertest" 
        });
        exampleUser.save(function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log("Тестовый пользователь сохранен");
            }
        });
    }
});


var UsersСontroller = {};

UsersСontroller.index = function (req, res) {
    console.log("вызвано действие: индекс");
    res.send(200);
};

// Отобразить пользователя
UsersСontroller.show = function (req, res) {
    console.log("вызвано действие: показать");
    res.send(200);
};

// Создать нового пользователя
UsersСontroller.create = function (req, res) {
    console.log("вызвано действие: создать");
    res.send(200);
};

// Обновить существующего пользователя
UsersСontroller.update = function (req, res) {
    console.log("вызвано действие: обновить");
    res.send(200);
};

// Удалить существующего пользователя
UsersСontroller.destroy = function (req, res) {
    console.log("destroy action called");
    res.send(200);
};

module.exports = UsersСontroller;