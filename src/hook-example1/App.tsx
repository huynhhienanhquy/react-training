import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoStats from "./components/TodoStats";
import ClickCounter from "./components/ClickCounter";
import AutoSave from "./components/AutoSave";
import type { Todo } from "./types";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  function addTodo(title: string) {
    const newTodo: Todo = {
      id: Date.now(),
      title,
    };

    setTodos((prev) => [...prev, newTodo]);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>useRef Demo</h1>

      <TodoForm onAdd={addTodo} />

      <TodoStats count={todos.length} />

      <TodoList todos={todos} />

      <ClickCounter />

      <AutoSave />
    </div>
  );
}
