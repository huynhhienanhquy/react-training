import {
  createContext,
  useContext
} from "react"

export type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
}

//Create context to share the theme across multiple components.
export const ThemeContext = createContext<ThemeContextType | null>(null);

//Custom hooks help to use ThemeContext more efficiently.

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeContext.Provider");
  }

  return context;
}
