"use strict";

function countOfCompletedTasks(props) {
    var completed = 0;
    props.toDosCounter.forEach(function (ToDo) {
        if (ToDo.completed === true) {
            completed += 1;
        }
    });
    return completed;
}

function ToDoCounter(props) {
    return React.createElement(
        "h2",
        { className: "to-do-counter" },
        "Has completado ",
        React.createElement(
            "span",
            null,
            " ",
            countOfCompletedTasks(props),
            " "
        ),
        " de ",
        React.createElement(
            "span",
            null,
            " ",
            props.toDosCounter.length,
            " "
        ),
        " tareas pendientes "
    );
}

function ToDoItem(props) {
    return React.createElement(
        "li",
        { className: "ToDoItem" },
        React.createElement(
            "span",
            { className: "Icon Icon-check " + (props.completed && 'Icon-check--active') },
            "\u221A"
        ),
        React.createElement(
            "p",
            { className: "TodoItem-p " + (props.completed && 'TodoItem-p--complete') },
            props.text
        ),
        React.createElement(
            "span",
            { className: "Icon Icon-delete" },
            "X"
        )
    );
}

function ToDoList(props) {
    return React.createElement(
        "section",
        null,
        React.createElement(
            "ul",
            null,
            props.children
        )
    );
}

function ToDoSearch(props) {
    return React.createElement("input", { className: "TodoSearch", placeholder: props.text });
}

function CreateToDoButton(props) {
    return React.createElement(
        "button",
        { className: "CreateTodoButton" },
        "+"
    );
}

var toDos = [{ text: 'Programar Flags', completed: true }, { text: 'Ajustar estilos del menú de departamentos', completed: false }, { text: 'Ajustar estilos de la landing principal', completed: false }];

function App() {
    return React.createElement(
        React.Fragment,
        null,
        React.createElement(ToDoCounter, { toDosCounter: toDos }),
        React.createElement(ToDoSearch, { text: "Ingresa un texto relacionado a tu busqueda..." }),
        React.createElement(
            ToDoList,
            null,
            toDos.map(function (ToDo) {
                return React.createElement(ToDoItem, {
                    key: ToDo.text,
                    text: ToDo.text,
                    completed: ToDo.completed
                });
            })
        ),
        React.createElement(CreateToDoButton, null)
    );
}

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
