import React from "react";
import { ToDoCounter } from "../ToDoCounter";
import { ToDoSearch } from "../ToDoSearch";
import { ToDoList } from "../ToDoList";
import { ToDoItem } from "../ToDoItem";
import { ToDoForm } from "../ToDoForm";
import { CreateToDoButton } from "../CreateToDoButton";
import { Modal } from "../Modal";

function AppUI({
    loading,
    error,
    toDos,
    searchValue,
    setSearchValue,
    searchedToDos,
    addTodo,
    completeTodo,
    deleteTodo,
    openModal,
    setOpenModal,
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

            {!!openModal && (
                <Modal>
                    <ToDoForm addTodo={addTodo} setOpenModal={setOpenModal} />
                </Modal>
            )}

            <CreateToDoButton 
                setOpenModal={setOpenModal}
            />
        </React.Fragment>
    );
}

export { AppUI }