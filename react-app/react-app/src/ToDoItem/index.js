import React from "react";
import './ToDoItem.css';
import { Draggable } from "react-beautiful-dnd";

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

export { ToDoItem };