import { useTheme } from "../context/ThemeContext";

export function Header() {
  const {theme, toggleTheme} = useTheme();

  return (
    <header>
      <h1>Todo Dashboard</h1>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </header>
  )
}
