

const TodoData = (props) => {
    const { todoList, removeTodo } = props;

    return (
        <div className='todo-data'>
            {todoList.map((item, index) => {
                return (
                    <div className={`todo-item`} key={item.id}>
                        <div>{item.name}</div>
                        <button onClick={() => removeTodo(item.id)}>Delete</button>

                    </div>
                )
            })}
        </div>
    );
}
export default TodoData;