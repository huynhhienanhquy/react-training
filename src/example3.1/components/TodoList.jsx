import TodoItem from "./TodoItem";

export default function TodoList({
  todos,
  selectedId,
  onSelect
}) {
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
