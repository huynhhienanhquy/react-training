import { useLayoutEffect, useRef, useState } from "react";
import type { Todo } from "../types/todo";

type TodoStatsProps = {
  todos: Todo[];
};

export function TodoStats({ todos }: TodoStatsProps) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (!boxRef.current) return;

    const rect = boxRef.current.getBoundingClientRect();
    setHeight(rect.height);
  }, [todos.length]);

  const doneCount = todos.filter((todo) => todo.done).length;

  return (
    <div ref={boxRef}>
      <p>Total: {todos.length}</p>
      <p>Done: {doneCount}</p>
      <small>Stats box height: {height}px</small>
    </div>
  );
}
