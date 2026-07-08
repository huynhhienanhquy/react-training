import {
  useEffect,
  useState
} from "react"

//Custom hook to save state to localStorage
export function useLocalStorage<T>(key: string, initiaValue: T) {
  const [value, setValue] = useState<T>(() => {
    const savedValue = localStorage.getItem(key);

    //If localStorage contains data, retrieve it.
    if (savedValue) {
      return JSON.parse(savedValue);
    }

    //If it's not already there, use the default value.
    return initiaValue;
  })

  //Every time the value changes, it is saved to localStorage.
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value])

  return [value, setValue] as const
}
