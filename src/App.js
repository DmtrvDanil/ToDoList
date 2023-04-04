import React, {useEffect, useState} from "react";
import './App.css';
import ToDoList from "./component/toDoList";
import TextDo from "./component/textDo";
import {useDispatch, useSelector} from "react-redux";
import {addTodo, fetchTodos} from "./component/store/toDoSlice";
import './component/styles.css'
import ThemeSelector from "./component/themeReducer";

function App() {
    const [text, setText] = useState('');
    // console.log(useSelector(state => state));
    // return;
    const {status, error} = useSelector(state => state.persistedReducer.todos.todos);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchTodos());
    // }, [dispatch]);

    const addTask = () => {
        dispatch(addTodo(text));
        setText('');
    }

    return (
        <div className="App">
            <ThemeSelector />
            <TextDo text={text} setText={setText} addToDo={addTask}/>

            {status === 'loading' && <h2>Loading....</h2>}
            {error && <h2>Error {error}</h2>}

            <ToDoList />
        </div>
    );
}

export default App;
