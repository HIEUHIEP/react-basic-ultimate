
const TodoNew = (props) => {
    const { addNewTodo } = props
    const handleClick = () => {
        addNewTodo();
    };
    const handleOnChange = (event) => {
        console.log(event.target.value)
    };

    return (
        <div className='todo-new'>
            <input type="text"
                onChange={handleOnChange}
            ></input>
            <button
                style={{ cursor: "pointer" }}
                onClick={handleClick}
            >Add</button>
        </div>
    );
}

export default TodoNew;