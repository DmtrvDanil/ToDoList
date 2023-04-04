import React from "react";

const TextDo = (props) => {
    return (
        <label>
            <input value={props.text} onChange={(e) => {
                props.setText(e.target.value)
            }}/>
            <button onClick={props.addToDo}>Add Do</button>
        </label>
    )
}

export default TextDo;