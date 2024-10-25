import './conponents/todo/todo.css';
import TodoData from './conponents/todo/TodoData';
import TodoNew from './conponents/todo/TodoNew';
import reactLogo from './assets/react.svg'

const App = () => {
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
      <TodoData name={hieppu} age={age} data={data} />
      <div className='todo-image'>
        <img src={reactLogo} className='logo'></img>
      </div>
    </div>
  )
}

export default App
