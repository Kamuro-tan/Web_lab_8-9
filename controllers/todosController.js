
var ToDo = require("../models/todo"),
    User = require('../models/user'),
    mongoose = require("mongoose");

var ToDosСontroller = {};

ToDosСontroller.index = function (req, res) {
    var username = req.params.username || null;

    var respondWithToDos = function (query) {
        ToDo.find(query, function (err, toDos) {
            if (err !== null) {
                res.json(500, err);
            } else {
                res.status(200).json(toDos);
            }
        });
    };

    if (username !== null) {
        User.find({ "username": username }, function (err, result) {
            if (err !== null) {
                res.json(500, err);
            } else if (result.length === 0) {
                res.status(404).json({ "result_length": 0 });
            } else {
                respondWithToDos({ "owner": result[0]._id });
            }
        });
    } else {
        res.status(404).json({ "username": username });
    }
};

ToDosСontroller.show = function (req, res) {
    console.log("вызвано действие: показать");
    res.send(200);
};

ToDosСontroller.create = function (req, res) {
    var username = req.params.username || null;

    var newToDo = new ToDo({
        "description": req.body.description,
        "tags": req.body.tags
    });

    User.find({ "username": username }, function (err, result) {
        if (err) {
            res.send(500);
        } else {
            if (result.length === 0) {
                newToDo.owner = null;
            } else {
                newToDo.owner = result[0]._id;
            }
            
            newToDo.save(function (err, result) {
                if (err !== null) {
                    res.json(500, err);
                } else {
                    res.status(200).json(result);
                }
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
