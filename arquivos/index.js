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

    return (
        <li className="ToDoItem">
            <span
                className={`Icon Icon-check ${props.completed && 'Icon-check--active'}`}
                onClick={props.onComplete}
            >
                √
            </span>
            <p className={`TodoItem-p ${props.completed && 'TodoItem-p--complete'}`}>
                {props.text}
            </p>
            <span
                className="Icon Icon-delete"
                onClick={props.onDelete}
            >
                X
            </span>
        </li>
    );
}

function ToDoList(props) {
    return (
        <section>
            <ul>
                {props.children}
            </ul>
        </section>
    );
}

function ToDoSearch({ searchValue, setSearchValue, text }) {
    const onSearchValueChange = (event) => {
        // console.log(event.target.value);
        setSearchValue(event.target.value);
    };

    return (
        <input
            className="TodoSearch"
            placeholder={text}
            value={searchValue}
            onChange={onSearchValueChange}
        />
    );
}



function CreateToDoButton(props) {
    const onClickButton = (msg) => {
        alert(msg);
    };

    return (
        <button
            className="CreateTodoButton"
            onClick={() => onClickButton('Aquí se debería abrir el modal')}
        >
            +
        </button>
    );
}

const defaultToDos = [
    { text: 'Programar Flags Sale Event', completed: true },
    { text: 'Flags Bancolombia Carrousel', completed: true },
    { text: 'Ajustar estilos del menú de departamentos', completed: false },
    { text: 'Ajustar estilos de la landing principal', completed: false },
    { text: 'Agregar filtro de precios', completed: true },
];

function App() {
    const [toDos, setToDo] = React.useState(defaultToDos);
    const [searchValue, setSearchValue] = React.useState('');
    let searchedToDos = [];

    if (!searchValue.length >= 1) {
        searchedToDos = toDos;
    } else {
        searchedToDos = toDos.filter(todo => {
            const todoText = todo.text.toLowerCase();
            const searchText = searchValue.toLowerCase();
            return todoText.includes(searchText);
        });
    }

    const completeTodo = (text) => {
        const todoIndex = toDos.findIndex(todo => todo.text === text);
        const newTodos = [...toDos];
        newTodos[todoIndex].completed = true;
        setToDo(newTodos);
    };

    const deleteTodo = (text) => {
        const todoIndex = toDos.findIndex(todo => todo.text === text);
        const newTodos = [...toDos];
        newTodos.splice(todoIndex, 1);
        setToDo(newTodos);
    };

    return (
        <React.Fragment>

            <ToDoCounter toDosCounter={toDos} />

            <ToDoSearch
                text="Ingresa un texto relacionado a tu busqueda..."
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />

            <ToDoList>
                {searchedToDos.map(ToDo => (
                    <ToDoItem
                        key={ToDo.text}
                        text={ToDo.text}
                        completed={ToDo.completed}
                        onComplete={() => completeTodo(ToDo.text)}
                        onDelete={() => deleteTodo(ToDo.text)} />
                ))}
            </ToDoList>

            <CreateToDoButton />
        </React.Fragment>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);