import type { Todo } from "../type";

interface TodoDetailProps {
  todo: Todo | null;
}

export default function TodoDetail({
  todo,
}: TodoDetailProps) {
  if (!todo) {
    return <h3>Select a todo to see details</h3>;
  }

  return (
    <>
      <h2>Todo Details</h2>
      <p>ID: {todo.id}</p>
      <p>Text: {todo.text}</p>
    </>
  );
}
