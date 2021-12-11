import React from "react";
import './ToDoItem.css';

function ToDoItem(props) {

    return (
        <li className="ToDoItem">
            <span
                className={`Icon Icon-check ${props.completed && 'Icon-check--active'}`}
                onClick={props.onComplete}
            >
                <i class="fas fa-check-square"></i>
            </span>
            <p className={`TodoItem-p ${props.completed && 'TodoItem-p--complete'}`}>
                {props.text}
            </p>
            <span
                className="Icon Icon-delete"
                onClick={props.onDelete}
            >
                <i class="far fa-trash-alt"></i>
            </span>
        </li>
    );
}

export { ToDoItem };