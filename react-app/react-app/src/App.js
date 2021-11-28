// import './App.css';

import React from "react";
import { ToDoCounter } from "./ToDoCounter";
import { ToDoSearch } from "./ToDoSearch";
import { ToDoList } from "./ToDoList";
import { ToDoItem } from "./ToDoItem";
import { CreateToDoButton } from "./CreateToDoButton";

const defaultToDos = [
  { text: 'Programar Flags Sale Event', completed: true },
  { text: 'Flags Bancolombia Carrousel', completed: true },
  { text: 'Ajustar estilos del menú de departamentos', completed: false },
  { text: 'Ajustar estilos de la landing principal', completed: false },
  { text: 'Agregar filtro de precios', completed: true },
];

function App() {
  const [toDos, setToDo] = React.useState(defaultToDos);
  const [searchValue, setSearchValue] = React.useState('');
  let searchedToDos = [];

  if (!searchValue.length >= 1) {
    searchedToDos = toDos;
  } else {
    searchedToDos = toDos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }

  const completeTodo = (text) => {
    const todoIndex = toDos.findIndex(todo => todo.text === text);
    const newTodos = [...toDos];
    newTodos[todoIndex].completed = true;
    setToDo(newTodos);
  };

  const deleteTodo = (text) => {
    const todoIndex = toDos.findIndex(todo => todo.text === text);
    const newTodos = [...toDos];
    newTodos.splice(todoIndex, 1);
    setToDo(newTodos);
  };

  return (
    <React.Fragment>

      <ToDoCounter toDosCounter={toDos} />

      <ToDoSearch
        text="Ingresa un texto relacionado a tu busqueda..."
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <ToDoList>
        {searchedToDos.map(ToDo => (
          <ToDoItem
            key={ToDo.text}
            text={ToDo.text}
            completed={ToDo.completed}
            onComplete={() => completeTodo(ToDo.text)}
            onDelete={() => deleteTodo(ToDo.text)}          />
        ))}
      </ToDoList>

      <CreateToDoButton />
    </React.Fragment>
  );
}

export default App;
