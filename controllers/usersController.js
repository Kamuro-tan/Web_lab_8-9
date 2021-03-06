
var User = require("../models/user.js"),
    ToDo = require("../models/todo"),
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
    User.find({}, function (err, Users) {
        if (!err) res.json(Users);
        else console.log("---Get Error!---", err);
    });
};

// Отобразить пользователя
UsersСontroller.show = function (req, res) {
    console.log("вызвано действие: показать");
    res.send(200);
};

// Создать нового пользователя
UsersСontroller.create = function (req, res) {
    var newUser = new User({
        "username": req.body.username,
        "id": req.body.id
    });

    newUser.save(function (err, result) {
        if (err !== null) {
            res.json(500, err);
        } else {
            res.status(200).json(result);
        }
    });
};

// Обновить существующего пользователя
UsersСontroller.update = function (req, res) {
    console.log("вызвано действие: обновить");
    res.send(200);
};

// Удалить существующего пользователя
UsersСontroller.destroy = function (req, res) {
    var username = req.params.username;

    User.deleteOne({ "username": username }, function (err, user) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            if (user.acknowledged === true && user.deletedCount === 1) {
                res.status(200).json(user);

            } else {
                res.status(404).json({ "status": 404 });
            }
        }
    });

    User.find({ "username": username }, function (err, result) {
        if (err) {
            res.send(500);
        } else {
            var userid = result[0]._id;

            ToDo.deleteMany({ "owner": userid }, function (err, todo) {
                if (err !== null) {
                    res.status(500).json(err);
                } else {
                    if (todo.acknowledged === true) {
                        // res.status(200).json(todo);

                    } else {
                        res.status(404).json({ "status": 404 });
                    }
                }
            });
        }
    });

};

module.exports = UsersСontroller;
