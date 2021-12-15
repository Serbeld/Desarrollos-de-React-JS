import React from "react";
import './ToDoList.css';
import { Droppable } from "react-beautiful-dnd";

function ToDoList(props) {
    return (
        <Droppable droppableId="droppable">
            {(droppableProvided) => 
                (
                    <ul
                        {...droppableProvided.droppableProps}
                        ref={droppableProvided.innerRef}
                    >
                        {props.children}
                        {droppableProvided.placeholder}
                    </ul>
                )
            }
        </Droppable>
    );
}

export { ToDoList };