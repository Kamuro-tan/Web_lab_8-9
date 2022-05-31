
var ToDo = require("../models/todo"),
    mongoose = require("mongoose");

var ToDosСontroller = {};

ToDosСontroller.index = function (req, res) {
    ToDo.find({}, function (err, toDos) {
        if (!err) res.json(toDos);
        else console.log("---Get Error!---", err);
    });
};

ToDosСontroller.show = function (req, res) {
    console.log("вызвано действие: показать");
    res.send(200);
};

ToDosСontroller.create = function (req, res) {
    console.log(req.body);

    var newToDo = new ToDo({
        "description": req.body.description,
        "tags": req.body.tags
    });

    newToDo.save(function (err, result) {
        if (err !== null) {
            console.log(err);
            res.send("---Saving Error!---");
        } else {
            // клиент ожидает, что будут возвращены все задачи, поэтому для сохранения совместимости сделаем дополнительный запрос
            ToDo.find({}, function (err, result) {
                if (err !== null) {
                    res.send("Error! NewToDo wasn't save.");
                }
                res.json(result);
            });
        }
    });
};

ToDosСontroller.update = function (req, res) {
    console.log("вызвано действие: обновить");
    res.send(200);
};

ToDosСontroller.destroy = function (req, res) {
    console.log("destroy action called");
    res.send(200);
};

module.exports = ToDosСontroller;
