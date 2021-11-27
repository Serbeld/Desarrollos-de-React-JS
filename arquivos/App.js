// import './App.css';

import React from "react";
import { ToDoCounter } from "./ToDoCounter";
import { ToDoSearch } from "./ToDoSearch";
import { ToDoList } from "./ToDoList";
import { ToDoItem } from "./ToDoItem";
import { CreateToDoButton } from "./CreateToDoButton";

const toDos = [
  { text: 'Programar Flags', completed: true},
  { text: 'Ajustar estilos del menú de departamentos', completed: false},
  { text: 'Ajustar estilos de la landing principal', completed: false},
];

function App() {
  return (
    <React.Fragment>

      <ToDoCounter toDosCounter={ toDos } />
      
      <ToDoSearch text="Ingresa un texto relacionado a tu busqueda..." />

      <ToDoList>
        {toDos.map(ToDo => (
          <ToDoItem
            key={ToDo.text}
            text={ToDo.text}
            completed={ToDo.completed}
          />
        ))}
      </ToDoList>

      <CreateToDoButton />
    </React.Fragment>
  );
}

export default App;
