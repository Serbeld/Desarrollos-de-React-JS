import React from "react";

function ToDoSearch(props){
    return(
        <input placeholder={ props.text } />
    );
}

export { ToDoSearch };