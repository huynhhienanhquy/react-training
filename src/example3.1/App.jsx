import {useState, useEffect} from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoDetail from './components/TodoDetail';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  //Reading data during mounting
  useEffect(() => {
    const data = localStorage.getItem('todos');
    if (data) {
      setTodos(JSON.parse(data));
    }
  }, []);

  //Writing data during updating
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function addTodo(text) {
    const newTodo = {
      id: Date.now(),
      title: text,
    };
    setTodos([...todos, newTodo]);
  }

  const selectedTodo = todos.find((todo) => todo.id === selectedId);

  return (
    <div style={{padding: 20}}>
      <h1>Todo App</h1>
      <TodoForm onAdd={addTodo} />
      <p>Total: {todos.length}</p>

      <TodoList
        todos={todos}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />

      <TodoDetail todo={selectedTodo} />
      </div>
  );
}
