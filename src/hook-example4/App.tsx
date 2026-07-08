import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Input,
  Separator,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";

import { ThemeContext, type Theme } from "./context/ThemeContext";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { TodoStats } from "./components/TodoStats";
import { todoReducer, type Todo } from "./reducer/todoReducer";
import { useLocalStorage } from "./hooks/useLocalStorage";

const initialTodos: Todo[] = [
  {
    id: 1,
    title: "Learn useState",
    completed: true,
  },
  {
    id: 2,
    title: "Learn useReducer",
    completed: false,
  },
];

export default function App() {
  // useState manages keyword search
  const [searchText, setSearchText] = useState("");

  // Custom hook to save theme to localStorage
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "light");

  // useReducer manages to-do lists.
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);

  // useEffect changes the body background color according to the theme.
  useEffect(() => {
    document.body.style.backgroundColor = theme === "dark" ? "#111827" : "#f8fafc";
    document.body.style.color = theme === "dark" ? "#ffffff" : "#111827";
  }, [theme]);

  // UseCallback avoids recreating unnecessary functions.
  const handleAddTodo = useCallback((title: string) => {
    dispatch({
      type: "ADD_TODO",
      payload: title,
    });
  }, []);

  const handleToggleTodo = useCallback((id: number) => {
    dispatch({
      type: "TOGGLE_TODO",
      payload: id,
    });
  }, []);

  const handleDeleteTodo = useCallback((id: number) => {
    dispatch({
      type: "DELETE_TODO",
      payload: id,
    });
  }, []);

  const handleClearCompleted = useCallback(() => {
    dispatch({
      type: "CLEAR_COMPLETED",
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, [setTheme]);

  // useMemo to filter to-do by searchText
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [todos, searchText]);

  // useMemo avoids creating new context objects repeatedly.
  const themeContextValue = useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <Container maxW="2xl" py="10">
        <Box
          p="6"
          borderRadius="xl"
          boxShadow="lg"
          bg={theme === "dark" ? "gray.800" : "white"}
        >
          <VStack align="stretch" gap="5">
            <HStack justify="space-between">
              <Box>
                <Heading size="lg">React Hooks Todo</Heading>
                <Text color="gray.500">
                  Example tổng hợp Hooks + Chakra UI
                </Text>
              </Box>

              <Button onClick={toggleTheme} colorPalette="orange">
                {theme === "light" ? "Dark" : "Light"}
              </Button>
            </HStack>

            <Separator />

            <TodoForm onAddTodo={handleAddTodo} />

            <Input
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search todo..."
            />

            <TodoStats todos={todos} />

            <TodoList
              todos={filteredTodos}
              onToggleTodo={handleToggleTodo}
              onDeleteTodo={handleDeleteTodo}
            />

            <Button
              colorPalette="red"
              variant="subtle"
              onClick={handleClearCompleted}
            >
              Clear completed
            </Button>
          </VStack>
        </Box>
      </Container>
    </ThemeContext.Provider>
  );
}
