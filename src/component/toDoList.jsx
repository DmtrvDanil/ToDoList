import React from "react";
import ToDoListItem from "./toDoListItem";
import {useSelector} from "react-redux";

const ToDoList = () => {
    const todos = useSelector(state => state.todos.todos);
    return (
        <ul>
            {
                todos.map((item) => (
                        <ToDoListItem key={item.id}  {...item}/>
                    )
                )}
        </ul>
    )
}

export default ToDoList;