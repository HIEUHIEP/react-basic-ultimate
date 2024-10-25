import './conponents/todo/todo.css';
import TodoData from './conponents/todo/TodoData';
import TodoNew from './conponents/todo/TodoNew';
import reactLogo from './assets/react.svg'
import { useState } from 'react';

const App = () => {
  const [todoList, setTodoList] = useState([])
  const hieppu = "Hieppu";
  const age = 22;
  const data = {
    address: "dn",
    country: "vn"
  };

  const addNewTodo = (name) => {
    alert(`hi ${name}`);
  };
  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew addNewTodo={addNewTodo} />
      <TodoData todoList={todoList} />
      <div className='todo-image'>
        <img src={reactLogo} className='logo'></img>
      </div>
    </div>
  )
}

export default App
