import './conponents/todo/todo.css';
import TodoData from './conponents/todo/TodoData';
import TodoNew from './conponents/todo/TodoNew';
import reactLogo from './assets/react.svg'
import { useState } from 'react';

const App = () => {
  const [todoList, setTodoList] = useState([

  ])

  const addNewTodo = (name) => {
    const newTodo = {
      id: randomIntFromInterval(1, 1000000),
      name: name
    }
    setTodoList([...todoList, newTodo]);

  };

  const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew addNewTodo={addNewTodo} />
      {todoList.length > 0 ?
        <TodoData todoList={todoList} />
        :
        <div className='todo-image'>
          <img src={reactLogo} className='logo'></img>
        </div>
      }

    </div>
  )
}

export default App
