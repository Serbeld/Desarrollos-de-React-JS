import React from "react";
import './CreateToDoButton.css';

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

export { CreateToDoButton };