import { memo } from "react";
import type { Todo } from "../types/todo";

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export const TodoList = memo(function TodoList({
  todos,
  onToggle,
  onDelete,
}: TodoListProps) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} style={{ opacity: todo.pending ? 0.5 : 1 }}>
          <span
            onClick={() => onToggle(todo.id)}
            style={{
              textDecoration: todo.done ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            {todo.text}
          </span>

          {todo.pending && " (saving...)"}

          <button onClick={() => onDelete(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
});
