import React from "react";
import './ToDoCounter.css';

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

export { ToDoCounter };