import {
  useId,
  useRef,
  useState
} from "react";
import {
  Button,
  Field,
  HStack,
  Input
} from "@chakra-ui/react";
import type { FormEvent } from "react";

type TodoFormProps = {
  onAddTodo: (title: string) => void;
};

export function TodoForm({ onAddTodo }: TodoFormProps) {
  // useState manages input values.
  const [title, setTitle] = useState("");

  // useRef is used to refocus the input after adding a todo.
  const inputRef = useRef<HTMLInputElement>(null);

  // useId creates a unique ID for the label and input.
  const inputId = useId();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!title.trim()) return;

    onAddTodo(title);

    // Delete input after adding
    setTitle("");

    // Focus the input again.
    inputRef.current?.focus();
  }

  return (
    <form onSubmit={handleSubmit}>
      <Field.Root>
        <Field.Label htmlFor={inputId}>New Todo</Field.Label>

        <HStack>
          <Input
            id={inputId}
            ref={inputRef}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter todo..."
          />

          <Button type="submit" colorPalette="orange">
            Add
          </Button>
        </HStack>
      </Field.Root>
    </form>
  );
}
