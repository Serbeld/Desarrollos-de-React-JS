const { DragDropContext, Draggable, Droppable } = window.ReactBeautifulDnd;

function ToDoForm(props) {

    const [newTodoValue, setNewTodoValue] = React.useState('');

    const onChange = (event) => {
        setNewTodoValue(event.target.value)
    }

    const onCancel = () => {
        props.setOpenModal(false);
        let element = document.getElementsByClassName("CreateTodoButton");
        element[0].classList.toggle("close");
    }

    const onSubmit = (event) => {
        // stops the redirect
        event.preventDefault();
        if (newTodoValue.length) {
            props.addTodo(newTodoValue);
            props.setOpenModal(false);
            let element = document.getElementsByClassName("CreateTodoButton");
            element[0].classList.toggle("close");
        }
    }

    const commentEnterSubmit = (e) => {
        if (e.key === "Enter" && e.shiftKey === false) {
            return onSubmit(e);
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <label>Escribe tu nueva tarea</label>
            <textarea
                value={newTodoValue}
                onChange={onChange}
                onKeyPress={commentEnterSubmit}
                placeholder="Escribe el título de la tarea..."
            />
            <div className="TodoForm-buttonContainer">
                <button
                    type="button"
                    onClick={onCancel}
                    className="TodoForm-button TodoForm-button--cancel"
                >
                    Cancelar
                </button>

                <button
                    type="submit"
                    className="TodoForm-button TodoForm-button--add"
                >
                    Añadir
                </button>
            </div>
        </form>
    );

}

function countOfCompletedTasks(props) {
    let completed = 0
    props.toDosCounter.forEach(ToDo => {
        if (ToDo.completed === true) {
            completed += 1;
        }
    }
    )
    return completed
}

function ToDoCounter(props) {
    return (
        <h2 className="to-do-counter">Has completado <span> {countOfCompletedTasks(props)} </span> de <span> {props.toDosCounter.length} </span> tareas pendientes </h2>
    );
}

function ToDoItem(props) {

    const onClickButton = () => {
        props.setOpenEditModal(prevState => !prevState);
        props.onSetIndexEditFunction();
        let element = document.getElementsByClassName("CreateTodoButton");
        element[0].classList.toggle("close");
    };

    return (
        <Draggable draggableId={props.text} index={props.index}>
            {(draggableProvided) => (
                <li className="ToDoItem"
                    {...draggableProvided.draggableProps}
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.dragHandleProps}
                >
                    <span
                        className={`Icon Icon-check ${props.completed && 'Icon-check--active'}`}
                        onClick={props.onComplete}
                    >
                        <i className="fas fa-check-square"></i>
                    </span>
                    <p className={`TodoItem-p ${props.completed && 'TodoItem-p--complete'}`}>
                        {props.text}
                    </p>
                    <span
                        className="Icon Icon-edit"
                        onClick={onClickButton}
                    >
                        <i className="fas fa-edit"></i>
                    </span>
                    <span
                        className="Icon Icon-delete"
                        onClick={props.onDelete}
                    >
                        <i className="far fa-trash-alt"></i>
                    </span>
                </li>
            )}
        </Draggable>
    );
}

function ToDoList(props) {
    return (
        <Droppable droppableId="droppable">
            {(droppableProvided) =>
            (
                <ul
                    {...droppableProvided.droppableProps}
                    ref={droppableProvided.innerRef}
                >
                    {props.children}
                    {droppableProvided.placeholder}
                </ul>
            )
            }
        </Droppable>
    );
}

function ToDoSearch({ searchValue, setSearchValue, text }) {
    const onSearchValueChange = (event) => {
        // console.log(event.target.value);
        setSearchValue(event.target.value);
    };

    const onClickCloseSearch = (event) => {
        setSearchValue("");
    }

    return (
        <div className="search-container">
            <input
                className="TodoSearch"
                placeholder={text}
                value={searchValue}
                onChange={onSearchValueChange}
            />
            <i className="fas fa-window-close"
                onClick={onClickCloseSearch}
            ></i>
        </div>
    );
}

function Modal({ children }) {
    return ReactDOM.createPortal(
        <div className="ModalBackground">
            {children}
        </div>,
        document.getElementById('modal')
    );
}

function CreateToDoButton(props) {
    const onClickButton = () => {
        props.setOpenModal(prevState => !prevState);
        let element = document.getElementsByClassName("CreateTodoButton");
        element[0].classList.toggle("close");
    };

    return (
        <button
            className="CreateTodoButton"
            onClick={onClickButton}
        >
            +
        </button>
    );
}

function ToDoEditForm(props) {

    const [newTodoValue, setNewTodoValue] = React.useState('');

    const onChange = (event) => {
        setNewTodoValue(event.target.value)
    }

    const onCancel = () => {
        props.setOpenEditModal(false);
        let element = document.getElementsByClassName("CreateTodoButton");
        element[0].classList.toggle("close");
    }

    const onSubmit = (event) => {
        // stops the redirect
        event.preventDefault();
        if (newTodoValue.length) {
            props.editTodo(props.indexEdit, newTodoValue);
            props.setOpenEditModal(false);
            let element = document.getElementsByClassName("CreateTodoButton");
            element[0].classList.toggle("close");
        }
    }

    const commentEnterSubmit = (e) => {
        if (e.key === "Enter" && e.shiftKey === false) {
            return onSubmit(e);
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <label>Edita el título de la tarea</label>
            <textarea
                value={newTodoValue}
                onChange={onChange}
                onKeyPress={commentEnterSubmit}
                placeholder="Escribe el título de la tarea..."
            />
            <div className="TodoForm-buttonContainer">
                <button
                    type="button"
                    onClick={onCancel}
                    className="TodoForm-button TodoForm-button--cancel"
                >
                    Cancelar
                </button>

                <button
                    type="submit"
                    className="TodoForm-button TodoForm-button--add"
                >
                    Editar
                </button>
            </div>
        </form>
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

    ////////////////////////////////////////////////////////
    /// Action Creators ////////////////////////////////////
    ////////////////////////////////////////////////////////

    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [item, setItem] = React.useState(initialValue);

    const onError = (error) => {
        setError(error);
    };

    const onSuccess = (item) => {
        setError(false);
        setLoading(false);
        setItem(item);
    };

    const onSave = (item) => {
        setItem(item);
    };

    React.useEffect(() => {
        try {
            const localStorageItem = localStorage.getItem(itemName);
            let parsedItem;

            if (!localStorageItem) {
                localStorage.setItem(itemName, JSON.stringify(initialValue));
                parsedItem = initialValue;
            } else {
                try {
                    parsedItem = JSON.parse(localStorageItem);
                } catch (error) {
                    parsedItem = initialValue;
                }
            }

            onSuccess(parsedItem);
            // setItem(parsedItem);
            // setLoading(false);
        } catch (error) {
            onError(error);
            // setError(error);
        }
    }, []);

    const saveItem = (newItem) => {
        try {
            const stringifiedItem = JSON.stringify(newItem);
            localStorage.setItem(itemName, stringifiedItem);
            // setItem(newItem);
            onSave(newItem);
        } catch (error) {
            onError(error);
            // setError(error);
        }
    };

    return {
        item,
        saveItem,
        loading,
        error,
    };
}

function App() {
    const {
        item: todos,
        saveItem: saveTodos,
        loading,
        error,
    } = useLocalStorage('TODOS_V1', []);
    const [searchValue, setSearchValue] = React.useState('');
    const [openModal, setOpenModal] = React.useState(false);
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const [indexEdit, setindexEdit] = React.useState();

    let searchedTodos = [];

    if (!searchValue.length >= 1) {
        searchedTodos = todos;
    } else {
        searchedTodos = todos.filter(todo => {
            const todoText = todo.text.toLowerCase();
            const searchText = searchValue.toLowerCase();
            return todoText.includes(searchText);
        });
    }

    const addTodo = (text) => {
        const newTodos = [...todos];
        newTodos.push({
            completed: false,
            text
        })
        saveTodos(newTodos);
    };

    const completeTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text);
        const newTodos = [...todos];
        if (newTodos[todoIndex].completed === true) {
            newTodos[todoIndex].completed = false;
        } else {
            newTodos[todoIndex].completed = true;
        }
        saveTodos(newTodos);
    };

    const deleteTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text);
        const newTodos = [...todos];
        newTodos.splice(todoIndex, 1);
        saveTodos(newTodos);
    };

    const editTodo = (text, newText) => {
        const todoIndex = todos.findIndex(todo => todo.text === text);
        const newTodos = [...todos];
        newTodos[todoIndex].text = newText;
        saveTodos(newTodos);
    };

    const setIndexEditFunction = (text) => {
        setindexEdit(text);
    };

    const reorder = (list, startIndex, endIndex) => {
        const result = [...list];
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        saveTodos(result);
    };


    return (
        <React.Fragment>

            <ToDoCounter toDosCounter={todos} />

            <ToDoSearch
                text="Ingresa un texto relacionado a tu busqueda..."
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />
            <DragDropContext onDragEnd={(result) => {
                try {
                    const { source, destination } = result;
                    if (!destination) {
                        return;
                    }
                    if (
                        source.index === destination.index &&
                        source.droppableId === destination.droppableId
                    ) {
                        return;
                    }

                    reorder(todos, source.index, destination.index)

                } catch (error) {
                    console.warn(error.message)
                }
            }}>

                <ToDoList>
                    {error && <li className="ToDoItem"><p className="TodoItem-p false">Hubo un error, intenta recargar la página...</p></li>}
                    {loading && <li className="ToDoItem"><p className="TodoItem-p false">Cargando listado de tareas...</p></li>}
                    {(!loading && !searchedTodos.length && !searchValue.length) && <li className="ToDoItem"><p className="TodoItem-p false">¡Crea una nueva tarea!</p></li>}
                    {(!loading && !searchedTodos.length && !!searchValue.length) && <li className="ToDoItem"><p className="TodoItem-p false">No se encontraron resultados para "<b>{searchValue}</b>" </p></li>}

                    {searchedTodos.map((ToDo, index) => (
                        <ToDoItem
                            key={ToDo.text}
                            text={ToDo.text}
                            completed={ToDo.completed}
                            onComplete={() => completeTodo(ToDo.text)}
                            onDelete={() => deleteTodo(ToDo.text)}
                            onSetIndexEditFunction={() => setIndexEditFunction(ToDo.text)}
                            setOpenEditModal={setOpenEditModal}
                            index={index} />
                    ))}
                </ToDoList>
            </DragDropContext>


            {!!openModal && (
                <Modal>
                    <ToDoForm addTodo={addTodo} setOpenModal={setOpenModal} />
                </Modal>
            )}

            {!!openEditModal && (
                <Modal>
                    <ToDoEditForm indexEdit={indexEdit} editTodo={editTodo} setOpenEditModal={setOpenEditModal} />
                </Modal>
            )}

            <CreateToDoButton
                setOpenModal={setOpenModal}
            />
        </React.Fragment>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);