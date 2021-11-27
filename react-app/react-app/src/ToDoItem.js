import React from "react";

function ToDoItem(props){
    return(
        <li>
            <span>C</span>
            <p> { props.text } </p>
            <span>D</span>
        </li>
    );
}

export { ToDoItem };