
var express = require('express'),
    http = require('http'),
    mongoose = require('mongoose'),
    app = express();

app.use(express.static(__dirname + "/client"));
app.use(express.urlencoded({ extended: true }));

// подключаемся к хранилищу данных Amazeriffic в Mongo - ДЛЯ ЭТОГО НУЖЕН MongoDB!
mongoose.connect('mongodb://localhost/amazeriffic', (err) => {
    if (!err) console.log("Mongo connected.");
    else console.log("Mongo connect error!");
});

var ToDoSchema = mongoose.Schema({
    description: String,
    tags: [ String ]
});
var ToDo = mongoose.model("ToDo", ToDoSchema);

http.createServer(app).listen(3000);

// этот маршрут замещает наш файл todos.json в примере из части 5
app.get("/todos.json", function (req, res) {
    ToDo.find({}, function(err, toDos) {
        if (!err) res.json(toDos);
        else console.log("Get error!");
    });
});

app.post("/todos", function (req, res) {
    var newToDo = req.body;
    console.log(newToDo);

    res.json({ "message": "Вы размещаетесь на сервере!" });
});
