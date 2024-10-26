import TodoData from './TodoData';
import TodoNew from './TodoNew';
import reactLogo from './../../assets/react.svg'
import { useState } from 'react';

const TodoApp = () => {
    const [todoList, setTodoList] = useState([

    ])

    const addNewTodo = (name) => {
        const newTodo = {
            id: randomIntFromInterval(1, 1000000),
            name: name
        }
        setTodoList([...todoList, newTodo]);

    };

    const removeTodo = (id) => {
        const newList = todoList.filter((item) => item.id !== id);
        setTodoList(newList);
    };

    const randomIntFromInterval = (min, max) => { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    return (
        <div className="todo-container">
            <div className="todo-title">Todo List</div>
            <TodoNew addNewTodo={addNewTodo} />
            {todoList.length > 0 ?
                <TodoData todoList={todoList} removeTodo={removeTodo} />
                :
                <div className='todo-image'>
                    <img src={reactLogo} className='logo'></img>
                </div>
            }
        </div>
    );
}
export default TodoApp