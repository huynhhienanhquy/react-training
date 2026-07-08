import {
  Button,
  Checkbox,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { Todo } from "../reducer/todoReducer";

type TodoListProps = {
  todos: Todo[];
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
};

export function TodoList({
  todos,
  onToggleTodo,
  onDeleteTodo,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <Text color="gray.500" textAlign="center">
        No todos found.
      </Text>
    );
  }

  return (
    <VStack align="stretch" gap="3">
      {todos.map((todo) => (
        <HStack
          key={todo.id}
          justify="space-between"
          p="3"
          borderWidth="1px"
          borderRadius="md"
        >
          <Checkbox.Root
            checked={todo.completed}
            onCheckedChange={() => onToggleTodo(todo.id)}
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>
              <Text
                textDecoration={todo.completed ? "line-through" : "none"}
                color={todo.completed ? "gray.500" : "inherit"}
              >
                {todo.title}
              </Text>
            </Checkbox.Label>
          </Checkbox.Root>

          <Button
            size="sm"
            colorPalette="red"
            variant="outline"
            onClick={() => onDeleteTodo(todo.id)}
          >
            Delete
          </Button>
        </HStack>
      ))}
    </VStack>
  );
}
