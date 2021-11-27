// import './App.css';

import React from "react";
import { ToDoCounter } from "./ToDoCounter";
import { ToDoSearch } from "./ToDoSearch";
import { ToDoList } from "./ToDoList";
import { ToDoItem } from "./ToDoItem";
import { CreateToDoButton } from "./CreateToDoButton";

const toDos = [
  { text: 'Programar Flags', completed: false},
  { text: 'Ajustar estilos del menú de departamentos', completed: false},
  { text: 'Ajustar estilos de la landing principal', completed: false},
];

function App() {
  return (
    <React.Fragment>

      <ToDoCounter title="Esta es una tarea To Do" />
      
      <ToDoSearch text="Ingresa un texto relacionado a tu busqueda..." />

      <ToDoList>
        {toDos.map(toDo => (
          <ToDoItem key={toDo.text} text= { toDo.text } />
        ))}
      </ToDoList>

      <CreateToDoButton />
    </React.Fragment>
  );
}

export default App;
