import React from "react";
import { ToDoCounter } from "../ToDoCounter";
import { ToDoSearch } from "../ToDoSearch";
import { ToDoList } from "../ToDoList";
import { ToDoItem } from "../ToDoItem";
import { CreateToDoButton } from "../CreateToDoButton";

function AppUI({
    loading,
    error,
    toDos,               
    searchValue,
    setSearchValue,
    searchedToDos,
    completeTodo,
    deleteTodo,
}) {
    return (
        <React.Fragment>

            <ToDoCounter toDosCounter={toDos} />

            <ToDoSearch
                text="Ingresa un texto relacionado a tu busqueda..."
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />

            <ToDoList>

            {error && <li className="ToDoItem"><p className="TodoItem-p false">Hubo un error, intenta recargar la página...</p></li>}
            {loading && <li className="ToDoItem"><p className="TodoItem-p false">Cargando listado de tareas...</p></li>}
            {(!loading && !searchedToDos.length) && <li className="ToDoItem"><p className="TodoItem-p false">¡Crea una nueva tarea!</p></li>}

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

export { AppUI }