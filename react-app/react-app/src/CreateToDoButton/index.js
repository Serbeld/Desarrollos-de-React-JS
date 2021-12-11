import React from "react";
import './CreateToDoButton.css';

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

export { CreateToDoButton };