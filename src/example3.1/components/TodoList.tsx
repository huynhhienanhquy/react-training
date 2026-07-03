import TodoItem from "./TodoItem";
import type { Todo } from "../type";

interface TodoListProps {
  todos: Todo[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export default function TodoList({
  todos,
  selectedId,
  onSelect,
}: TodoListProps) {
  return (
    <>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isSelected={selectedId === todo.id}
          onSelect={onSelect}
        />
      ))}
    </>
  );
}
