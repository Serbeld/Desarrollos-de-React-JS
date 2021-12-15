import React from "react";
import './ToDoItem.css';

function ToDoItem(props) {

    const onClickButton = () => {
        props.setOpenEditModal(prevState => !prevState);
        props.onSetIndexEditFunction();
        let element = document.getElementsByClassName("CreateTodoButton");
        element[0].classList.toggle("close");
    };

    return (
        <li className="ToDoItem">
            <span
                className={`Icon Icon-check ${props.completed && 'Icon-check--active'}`}
                onClick={props.onComplete}
            >
                <i className="fas fa-check-square"></i>
            </span>
            <span
                className={'Icon Icon-move'}
            >
                <i className="fas fa-th"></i>
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

        
    );
}

export { ToDoItem };