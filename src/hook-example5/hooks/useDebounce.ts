import {
  useEffect,
  useState
} from "react"

// Custom hook used to delay search value
// Avoid continuous filtering every time the user types
export function useDebounce<T>(value: T, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    //After the delay, Microsoft updated the debouncedValue.
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup of the old timer if the user continues typing
    return () => {
      clearTimeout(timer);
    }
  }, [value, delay])

  return debouncedValue;
}
