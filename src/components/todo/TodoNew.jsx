import { useState } from "react";

const TodoNew = (props) => {
    const { addNewTodo } = props

    const [valueInput, setValueInput] = useState("");
    const handleClick = () => {
        addNewTodo(valueInput);
        setValueInput("");
    };
    const handleOnChange = (event) => {
        setValueInput(event.target.value);
    };

    return (
        <div className='todo-new'>
            <input type="text"
                onChange={handleOnChange}
                value={valueInput}
            ></input>
            <button
                style={{ cursor: "pointer" }}
                onClick={handleClick}
            >Add</button>
            my text input is : {valueInput}
        </div>
    );
}

export default TodoNew;