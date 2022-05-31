
var express = require('express'),
    http = require('http'),
    mongoose = require('mongoose'),
    app = express();


app.use('/', express.static(__dirname + '/client'));
app.use('/user/:username', express.static(__dirname + '/client'));
app.use(express.urlencoded({ extended: true }));

// подключаемся к хранилищу данных Amazeriffic в Mongo - ДЛЯ ЭТОГО НУЖЕН MongoDB!
mongoose.connect('mongodb://localhost/amazeriffic', function (err) {
    if (!err) console.log("Mongo connected.");
    else console.log("---Mongo connect Error!---", err);
});


var ToDo = require('./models/todo'),
    User = require('./models/user'),
    usersController = require('./controllers/usersController'),
    todosController = require('./controllers/todosController');

http.createServer(app).listen(3000);

// app.get("/users.json", usersController.index);
// app.post("/users", usersController.create);
// app.get("/users/:username", usersController.show);
// app.put("/users/:username", usersController.update);
// app.delete("/users/:username", usersController.destroy);

app.get("/user/:username/todos.json", todosController.index);
app.post("/user/:username/todos", todosController.create);
app.put("/user/:username/todos/:id", todosController.update);
app.delete("/user/:username/todos/:id", todosController.destroy);

// этот маршрут замещает наш файл todos.json в примере из части 5
app.get("/todos.json", function (req, res) {
    ToDo.find({}, function (err, toDos) {
        if (!err) res.json(toDos);
        else console.log("---Get Error!---", err);
    });
});

app.post("/todos", function (req, res) {
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
});
