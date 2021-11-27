import React from "react";
import './ToDoSearch.css';

function ToDoSearch(props) {
    return (
        <input className="TodoSearch" placeholder={ props.text } />
    );
}

export { ToDoSearch };