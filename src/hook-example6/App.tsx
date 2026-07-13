import {
  Box,
  Container,
  Heading,
  Separator,
  VStack,
} from "@chakra-ui/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

import { ThemeContext, type Theme } from "./context/ThemeContext";
import { CounterPanel } from "./components/CounterPanel";
import { FocusInput } from "./components/FocusInput";
import { SearchProducts } from "./components/SearchProducts";
import { ThemePanel } from "./components/ThemePanel";
import { TransitionList } from "./components/TransitionList";

export default function App() {
  // useState management theme
  const [theme, setTheme] = useState<Theme>("light");

  // useEffect runs after the UI has finished rendering.
  useEffect(() => {
    document.title = `Theme: ${theme}`;
  }, [theme]);

  // useLayoutEffect runs before browser paint.
  useLayoutEffect(() => {
    document.body.style.backgroundColor =
      theme === "dark" ? "#111827" : "#f8fafc";

    document.body.style.color =
      theme === "dark" ? "#ffffff" : "#111827";
  }, [theme]);

  // useCallback cache function toggleTheme
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) =>
      prevTheme === "light" ? "dark" : "light"
    );
  }, []);

  // useMemo cache object passed to Context
  const themeContextValue = useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <Container maxW="4xl" py="10">
        <Box
          p="6"
          borderRadius="xl"
          boxShadow="md"
          bg={theme === "dark" ? "gray.800" : "white"}
        >
          <VStack align="stretch" gap="5">
            <Box>
              <Heading>React All Hooks Example</Heading>

            </Box>

            <Separator />

            <ThemePanel />

            <FocusInput />

            <CounterPanel />

            <SearchProducts />

            <TransitionList />
          </VStack>
        </Box>
      </Container>
    </ThemeContext.Provider>
  );
}
