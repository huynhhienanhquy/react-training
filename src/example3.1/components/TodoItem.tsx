import type { Todo } from "../type";

interface TodoItemProps {
  todo: Todo;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

export default function TodoItem({
  todo,
  isSelected,
  onSelect,
}: TodoItemProps) {
  return (
    <div
      style={{
        margin: 10,
        padding: 10,
        cursor: "pointer",
        border: "1px solid black",
        background: isSelected ? "#ddd" : "white",
      }}
      onClick={() => onSelect(todo.id)}
    >
      {todo.text}
    </div>
  );
}
