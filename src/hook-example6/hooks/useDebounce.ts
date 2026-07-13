import {
  useEffect,
  useState
} from "react";

// custom hook: delay value
export function useDebounce<T>(value: T, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // cleanup khi value thay đổi
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
