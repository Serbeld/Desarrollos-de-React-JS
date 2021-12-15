// import './App.css';

import React from "react";
import { ToDoCounter } from "../ToDoCounter";
import { ToDoSearch } from "../ToDoSearch";
import { ToDoList } from "../ToDoList";
import { ToDoItem } from "../ToDoItem";
import { ToDoForm } from "../ToDoForm";
import { ToDoEditForm } from "../ToDoEditForm";
import { CreateToDoButton } from "../CreateToDoButton";
import { Modal } from "../Modal";
import { useLocalStorage } from '../ToDoContext/UseLocalStorage.js';

function App() {
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage('TODOS_V1', []);
  const [searchValue, setSearchValue] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [indexEdit, setindexEdit] = React.useState();

  let searchedTodos = [];

  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }

  const addTodo = (text) => {
    const newTodos = [...todos];
    newTodos.push({
      completed: false,
      text
    })
    saveTodos(newTodos);
  };

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    if (newTodos[todoIndex].completed === true) {
      newTodos[todoIndex].completed = false;
    } else {
      newTodos[todoIndex].completed = true;
    }
    saveTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  const editTodo = (text, newText) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].text = newText;
    saveTodos(newTodos);
  };

  const setIndexEditFunction = (text) => {
    setindexEdit(text);
  };

  return (

    <React.Fragment>

      <ToDoCounter toDosCounter={todos} />

      <ToDoSearch
        text="Ingresa un texto relacionado a tu busqueda..."
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <ToDoList>

        {error && <li className="ToDoItem"><p className="TodoItem-p false">Hubo un error, intenta recargar la página...</p></li>}
        {loading && <li className="ToDoItem"><p className="TodoItem-p false">Cargando listado de tareas...</p></li>}
        {(!loading && !searchedTodos.length && !searchValue.length) && <li className="ToDoItem"><p className="TodoItem-p false">¡Crea una nueva tarea!</p></li>}
        {(!loading && !searchedTodos.length && !!searchValue.length) && <li className="ToDoItem"><p className="TodoItem-p false">No se encontraron resultados para "<b>{searchValue}</b>" </p></li>}

        {searchedTodos.map(ToDo => (
          <ToDoItem
            key={ToDo.text}
            text={ToDo.text}
            completed={ToDo.completed}
            onComplete={() => completeTodo(ToDo.text)}
            onDelete={() => deleteTodo(ToDo.text)}
            onSetIndexEditFunction={() => setIndexEditFunction(ToDo.text)}
            setOpenEditModal={setOpenEditModal} />
        ))}
      </ToDoList>

      {!!openModal && (
        <Modal>
          <ToDoForm addTodo={addTodo} setOpenModal={setOpenModal} />
        </Modal>
      )}

      {!!openEditModal && (
        <Modal>
          <ToDoEditForm indexEdit={indexEdit} editTodo={editTodo} setOpenEditModal={setOpenEditModal} />
        </Modal>
      )}

      <CreateToDoButton
        setOpenModal={setOpenModal}
      />
    </React.Fragment>
  );
}

export default App;
