
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
                res.status(404).json("That user doesn't exist!");
            } else {
                respondWithToDos({ "owner": result[0]._id });
            }
        });
    } else {
        res.status(404).json({ "username": username });
    }
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

ToDosСontroller.destroy = function (req, res) {
    var id = req.params.id;

    ToDo.deleteOne({ "_id": id }, function (err, todo) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            if (todo.acknowledged === true && todo.deletedCount === 1) {
                res.status(200).json(todo);
            } else {
                res.status(404).json({ "status": 404 });
            }
        }
    });
};

ToDosСontroller.update = function (req, res) {
    var id = req.params.id;
    var newDescription = { $set: { description: req.body.description } };

    ToDo.updateOne({ "_id": id }, newDescription, function (err, todo) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            if (todo.acknowledged === true && todo.modifiedCount === 1) {
                res.status(200).json(todo);
            } else {
                res.status(404).json({ "status": 404 });
            }
        }
    });
};

module.exports = ToDosСontroller;
