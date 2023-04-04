import {useDispatch} from "react-redux";
import {deleteTodo, toggleDone} from './store/toDoSlice';

const ToDoListItem = (props) => {
    const dispatch = useDispatch();
    const id = props.id;
    return (
        <li key={id}>
            <input type="checkbox" checked={props.completed} onChange={() => {dispatch(toggleDone(id))} }/>
            <span>{props.title}</span>
            <span onClick={() => dispatch(deleteTodo(id))}>&times;</span>
        </li>
    )
}

export default ToDoListItem;