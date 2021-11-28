import React from "react";
import './ToDoSearch.css';

function ToDoSearch({ searchValue, setSearchValue, text }) {
    const onSearchValueChange = (event) => {
        // console.log(event.target.value);
        setSearchValue(event.target.value);
    };

    return (
        <input
            className="TodoSearch"
            placeholder={text}
            value={searchValue}
            onChange={onSearchValueChange}
        />
    );
}


// placeholder={props.text}

export { ToDoSearch };