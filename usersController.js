
var User = require("../models/user.js"),
    mongoose = require("mongoose");

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
