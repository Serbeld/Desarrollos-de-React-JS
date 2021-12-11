import React from "react";
import './ToDoSearch.css';

function ToDoSearch({ searchValue, setSearchValue, text }) {
    const onSearchValueChange = (event) => {
        // console.log(event.target.value);
        setSearchValue(event.target.value);
    };

    const onClickCloseSearch = (event) => {
        setSearchValue("");
    }

    return (
        <div className="search-container">
            <input
                className="TodoSearch"
                placeholder={text}
                value={searchValue}
                onChange={onSearchValueChange}
            />
            <i className="fas fa-window-close"
                onClick={onClickCloseSearch}
                ></i>
        </div>
    );
}


// placeholder={props.text}

export { ToDoSearch };