
// функция создания массива целей, отсортированного по тегам
// function organizeByTags(toDoObjects) {
//     var organizedByTag = [];

//     toDoObjects.forEach(function(toDoObject) {
//         toDoObject.tags.forEach(function(objectTag) {
//             if (organizedByTag.length == 0) {
//                 organizedByTag.push({
//                     name: objectTag,
//                     toDos: [toDoObject.description]
//                 });
//             } else {
//                 var i = false;  // существует ли уже такой тег в списке тегов?
//                 organizedByTag.forEach(function(organizedByTagObject) {
//                     if (objectTag == organizedByTagObject.name) {
//                         organizedByTagObject.toDos.push(toDoObject.description);
//                         i = true;
//                     }
//                 });
//                 if (i == false) {
//                     organizedByTag.push({
//                         name: objectTag,
//                         toDos: [toDoObject.description]
//                     });
//                 }
//             }
//         });
//     });

//     return organizedByTag;
// }


function organizeByTags(toDoObjects) {
    var tags = [];

    toDoObjects.forEach(function (toDo) {
        toDo.tags.forEach(function (tag) {
            if (tags.indexOf(tag) === -1) {
                tags.push(tag);
            }
        });
    });

    var tagObjects = tags.map(function (tag) {
        var toDosWithTag = [];

        toDoObjects.forEach(function (toDo) {
            if (toDo.tags.indexOf(tag) !== -1) {
                toDosWithTag.push(toDo.description);
            }
        });
        return { "name": tag, "toDos": toDosWithTag };
    });

    return tagObjects;
};

function fromObjectsToArray(toDoObjects) {
    return toDoObjects.map(function(toDo) {
        return toDo.description;
    });
}
