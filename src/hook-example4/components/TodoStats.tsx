import {
  Badge,
  HStack,
} from "@chakra-ui/react";
import { useMemo } from "react";
import type { Todo } from "../reducer/todoReducer";

type TodoStatsProps = {
  todos: Todo[];
};

export function TodoStats({ todos }: TodoStatsProps) {
  //useMemo avoids recalculating if todos remain unchanged
  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((todo) => todo.completed).length;
    const active = total - completed;

    return {
      total,
      completed,
      active,
    };
  }, [todos]);

  return (
    <HStack gap="4" wrap="wrap">
      <Badge colorPalette="blue">Total: {stats.total}</Badge>
      <Badge colorPalette="green">Active: {stats.active}</Badge>
      <Badge colorPalette="purple">Completed: {stats.completed}</Badge>
    </HStack>
  );
}
