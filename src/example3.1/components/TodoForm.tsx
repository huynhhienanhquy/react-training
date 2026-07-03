import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";

interface TodoFormProps {
  onAdd: (text: string) => void;
}

export default function TodoForm({
  onAdd,
}: TodoFormProps) {
  const [text, setText] = useState<string>("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (text.trim() === "") return;

    onAdd(text);
    setText("");
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={handleChange}
        placeholder="Todo..."
      />

      <button type="submit">
        Add
      </button>
    </form>
  );
}
