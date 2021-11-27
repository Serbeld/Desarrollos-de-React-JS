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
        <h2 className="to-do-counter">Has completado <span> { countOfCompletedTasks(props) } </span> de <span> {props.toDosCounter.length} </span> tareas pendientes </h2>
    );
}

function ToDoItem(props) {
    return (
        <li className="ToDoItem">
            <span className={`Icon Icon-check ${props.completed && 'Icon-check--active'}`}>
                √
            </span>
            <p className={`TodoItem-p ${props.completed && 'TodoItem-p--complete'}`}>
                {props.text}
            </p>
            <span className="Icon Icon-delete">
                X
            </span>
        </li>
    );
}

function ToDoList(props){
    return(
        <section>
            <ul>
                { props.children }
            </ul>
        </section>
    );
}

function ToDoSearch(props) {
    return (
        <input className="TodoSearch" placeholder={ props.text } />
    );
}

function CreateToDoButton(props){
    return(
        <button className="CreateTodoButton">+</button>
    );
}

const toDos = [
    { text: 'Programar Flags', completed: true },
    { text: 'Ajustar estilos del menú de departamentos', completed: false },
    { text: 'Ajustar estilos de la landing principal', completed: false },
];

function App() {
    return (
        <React.Fragment>

            <ToDoCounter toDosCounter={toDos} />

            <ToDoSearch text="Ingresa un texto relacionado a tu busqueda..." />

            <ToDoList>
                {toDos.map(ToDo => (
                    <ToDoItem
                        key={ToDo.text}
                        text={ToDo.text}
                        completed={ToDo.completed}
                    />
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