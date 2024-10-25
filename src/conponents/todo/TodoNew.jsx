
const TodoNew = (props) => {
    const { addNewTodo } = props
    return (
        <div className='todo-new'>
            <input type="text"></input>
            <button onClick={addNewTodo('hip')}>Add</button>
        </div>
    );
}

export default TodoNew;