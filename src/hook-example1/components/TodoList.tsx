import type { Todo } from "../types";

interface Props {
  todos: Todo[];
}

export default function TodoList({ todos }: Props) {
  return (
    <>
      <h2>Todo List</h2>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

      <hr />
    </>
  );
}
