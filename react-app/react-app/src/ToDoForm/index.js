import React from 'react';


function ToDoForm(props){

    const [newTodoValue, setNewTodoValue] = React.useState('');

    const onChange = (event) => {
        setNewTodoValue(event.target.value)
    }

    const onCancel = () => {
        props.setOpenModal(false);
        let element = document.getElementsByClassName("CreateTodoButton");
        element[0].classList.toggle("close");
    }

    const onSubmit = (event) => {
        // stops the redirect
        event.preventDefault();
        props.addTodo(newTodoValue);
        props.setOpenModal(false);
        let element = document.getElementsByClassName("CreateTodoButton");
        element[0].classList.toggle("close");
    }

    return(
        <form onSubmit={onSubmit}>
            <label>Escribe tu nueva tarea</label>
            <textarea
                value={newTodoValue}
                onChange={onChange}
                placeholder="Escribe el título de la tarea..."
            />
            <div className="TodoForm-buttonContainer">
                <button
                    type="button"
                    onClick={onCancel}
                    className="TodoForm-button TodoForm-button--cancel"
                    >
                    Cancelar
                </button>
                
                <button
                    type="submit"          
                    className="TodoForm-button TodoForm-button--add"
                    >
                    Añadir
                </button>
            </div>
        </form>
    );

}

export { ToDoForm }