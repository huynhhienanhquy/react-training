import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoDetail from "./components/TodoDetail";
import type { Todo } from "./type";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const data = localStorage.getItem("todos");
    return data ? (JSON.parse(data) as Todo[]) : [];
  });

  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo(text: string): void {
    const newTodo: Todo = {
      id: Date.now(),
      text,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }

  const selectedTodo =
    todos.find((todo) => todo.id === selectedId) ?? null;

  return (
    <div style={{ padding: 20 }}>
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
