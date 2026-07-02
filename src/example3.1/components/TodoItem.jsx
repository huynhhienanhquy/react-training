export default function TodoItem({
  todo,
  isSelected,
  onSelect
}) {
  return (
    <div
      style={{
        margin: 10,
        padding: 10,
        cursor: "pointer",
        border: "1px solid black",
        background: isSelected ? "#ddd" : "white"
      }}
      onClick={() => onSelect(todo.id)}
    >
      {todo.text}
    </div>
  );
}
