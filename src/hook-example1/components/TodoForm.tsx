import { useRef, useState } from "react";

interface Props {
  onAdd: (title: string) => void;
}

export default function TodoForm({ onAdd }: Props) {
  const [text, setText] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  function handleAdd() {
    if (!text.trim()) return;

    onAdd(text);

    setText("");

    inputRef.current?.focus();
  }

  return (
    <>
      <h2>Add Todo</h2>

      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={handleAdd}>Add</button>

      <hr />
    </>
  );
}
