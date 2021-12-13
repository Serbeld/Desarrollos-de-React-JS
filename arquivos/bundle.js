"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function ToDoForm(props) {
    var _React$useState = React.useState(''),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        newTodoValue = _React$useState2[0],
        setNewTodoValue = _React$useState2[1];

    var onChange = function onChange(event) {
        setNewTodoValue(event.target.value);
    };
    var onCancel = function onCancel() {
        props.setOpenModal(false);
        var element = document.getElementsByClassName("CreateTodoButton");
        element[0].classList.toggle("close");
    };

    var onSubmit = function onSubmit(event) {
        // stops the redirect
        event.preventDefault();
        props.addTodo(newTodoValue);
        props.setOpenModal(false);
        var element = document.getElementsByClassName("CreateTodoButton");
        element[0].classList.toggle("close");
    };

    var commentEnterSubmit = function commentEnterSubmit(e) {
        if (e.key === "Enter" && e.shiftKey === false) {
            return onSubmit(e);
        }
    };

    return React.createElement(
        "form",
        { onSubmit: onSubmit },
        React.createElement(
            "label",
            null,
            "Escribe tu nueva tarea"
        ),
        React.createElement("textarea", {
            value: newTodoValue,
            onChange: onChange,
            onKeyPress: commentEnterSubmit,
            placeholder: "Escribe el t\xEDtulo de la tarea..."
        }),
        React.createElement(
            "div",
            { className: "TodoForm-buttonContainer" },
            React.createElement(
                "button",
                {
                    type: "button",
                    onClick: onCancel,
                    className: "TodoForm-button TodoForm-button--cancel"
                },
                "Cancelar"
            ),
            React.createElement(
                "button",
                {
                    type: "submit",
                    className: "TodoForm-button TodoForm-button--add"
                },
                "A\xF1adir"
            )
        )
    );
}

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
            {
                className: "Icon Icon-check " + (props.completed && 'Icon-check--active'),
                onClick: props.onComplete
            },
            React.createElement("i", { "class": "fas fa-check-square" })
        ),
        React.createElement(
            "p",
            { className: "TodoItem-p " + (props.completed && 'TodoItem-p--complete') },
            props.text
        ),
        React.createElement(
            "span",
            {
                className: "Icon Icon-delete",
                onClick: props.onDelete
            },
            React.createElement("i", { "class": "far fa-trash-alt" })
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
function ToDoSearch(_ref) {
    var searchValue = _ref.searchValue,
        setSearchValue = _ref.setSearchValue,
        text = _ref.text;

    var onSearchValueChange = function onSearchValueChange(event) {
        // console.log(event.target.value);
        setSearchValue(event.target.value);
    };

    var onClickCloseSearch = function onClickCloseSearch(event) {
        setSearchValue("");
    };

    return React.createElement(
        "div",
        { className: "search-container" },
        React.createElement("input", {
            className: "TodoSearch",
            placeholder: text,
            value: searchValue,
            onChange: onSearchValueChange
        }),
        React.createElement("i", { className: "fas fa-window-close",
            onClick: onClickCloseSearch
        })
    );
}

function Modal(_ref2) {
    var children = _ref2.children;

    return ReactDOM.createPortal(React.createElement(
        "div",
        { className: "ModalBackground" },
        children
    ), document.getElementById('modal'));
}

function CreateToDoButton(props) {
    var onClickButton = function onClickButton() {
        props.setOpenModal(function (prevState) {
            return !prevState;
        });
        var element = document.getElementsByClassName("CreateTodoButton");
        element[0].classList.toggle("close");
    };

    return React.createElement(
        "button",
        {
            className: "CreateTodoButton",
            onClick: onClickButton
        },
        "+"
    );
}

// const defaultToDos = [
//     { text: 'Programar Flags Sale Event', completed: true },
//     { text: 'Flags Bancolombia Carrousel', completed: true },
//     { text: 'Ajustar estilos del menú de departamentos', completed: false },
//     { text: 'Ajustar estilos de la landing principal', completed: false },
//     { text: 'Agregar filtro de precios', completed: true },
// ];

function useLocalStorage(itemName, initialValue) {
    var localStorageItem = localStorage.getItem(itemName);
    var parsedItem = void 0;

    if (!localStorageItem) {
        localStorage.setItem(itemName, JSON.stringify(initialValue));
        parsedItem = initialValue;
    } else {
        parsedItem = JSON.parse(localStorageItem);
    }

    var _React$useState3 = React.useState(parsedItem),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        item = _React$useState4[0],
        setItem = _React$useState4[1];

    var saveItem = function saveItem(newItem) {
        var stringifiedItem = JSON.stringify(newItem);
        localStorage.setItem(itemName, stringifiedItem);
        setItem(newItem);
    };

    return [item, saveItem];
}

function App() {
    var _useLocalStorage = useLocalStorage('TODOS_V1', []),
        _useLocalStorage2 = _slicedToArray(_useLocalStorage, 2),
        todos = _useLocalStorage2[0],
        saveTodos = _useLocalStorage2[1];

    var _React$useState5 = React.useState(''),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        searchValue = _React$useState6[0],
        setSearchValue = _React$useState6[1];

    var _React$useState7 = React.useState(false),
        _React$useState8 = _slicedToArray(_React$useState7, 2),
        openModal = _React$useState8[0],
        setOpenModal = _React$useState8[1];

    var searchedTodos = [];

    if (!searchValue.length >= 1) {
        searchedTodos = todos;
    } else {
        searchedTodos = todos.filter(function (todo) {
            var todoText = todo.text.toLowerCase();
            var searchText = searchValue.toLowerCase();
            return todoText.includes(searchText);
        });
    }

    var addTodo = function addTodo(text) {
        var newTodos = [].concat(_toConsumableArray(todos));
        newTodos.push({
            completed: false,
            text: text
        });
        saveTodos(newTodos);
    };

    var completeTodo = function completeTodo(text) {
        var todoIndex = todos.findIndex(function (todo) {
            return todo.text === text;
        });
        var newTodos = [].concat(_toConsumableArray(todos));
        if (newTodos[todoIndex].completed === true) {
            newTodos[todoIndex].completed = false;
        } else {
            newTodos[todoIndex].completed = true;
        }
        saveTodos(newTodos);
    };

    var deleteTodo = function deleteTodo(text) {
        var todoIndex = todos.findIndex(function (todo) {
            return todo.text === text;
        });
        var newTodos = [].concat(_toConsumableArray(todos));
        newTodos.splice(todoIndex, 1);
        saveTodos(newTodos);
    };

    return React.createElement(
        React.Fragment,
        null,
        React.createElement(ToDoCounter, { toDosCounter: todos }),
        React.createElement(ToDoSearch, {
            text: "Ingresa un texto relacionado a tu busqueda...",
            searchValue: searchValue,
            setSearchValue: setSearchValue
        }),
        React.createElement(
            ToDoList,
            null,
            searchedTodos.map(function (ToDo) {
                return React.createElement(ToDoItem, {
                    key: ToDo.text,
                    text: ToDo.text,
                    completed: ToDo.completed,
                    onComplete: function onComplete() {
                        return completeTodo(ToDo.text);
                    },
                    onDelete: function onDelete() {
                        return deleteTodo(ToDo.text);
                    } });
            })
        ),
        !!openModal && React.createElement(
            Modal,
            null,
            React.createElement(ToDoForm, { addTodo: addTodo, setOpenModal: setOpenModal })
        ),
        React.createElement(CreateToDoButton, {
            setOpenModal: setOpenModal
        })
    );
}

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
