import {
  Input,
  Spinner,
  Text,
  VStack
} from "@chakra-ui/react";
import {
  useDeferredValue,
  useMemo,
  useState,
  useTransition,
} from "react";

const bigList = Array.from({ length: 5000 }, (_, index) => {
  return `Product item ${index + 1}`;
});

export function TransitionList() {
  // useState management input
  const [keyword, setKeyword] = useState("");

  // useTransition helps to give heavy updates lower priority.
  const [isPending, startTransition] = useTransition();

  const [searchValue, setSearchValue] = useState("");

  // useDeferredValue delay value
  const deferredSearchValue = useDeferredValue(searchValue);

  function handleChange(value: string) {
    setKeyword(value);

    // Updating searchValue is considered a lower priority.
    startTransition(() => {
      setSearchValue(value);
    });
  }

  // useMemo cache filtered list
  const filteredList = useMemo(() => {
    return bigList.filter((item) =>
      item.toLowerCase().includes(deferredSearchValue.toLowerCase())
    );
  }, [deferredSearchValue]);

  return (
    <VStack align="stretch" borderWidth="1px" p="4" borderRadius="md">
      <Text fontWeight="bold">
        useTransition + useDeferredValue
      </Text>

      <Input
        value={keyword}
        onChange={(event) => handleChange(event.target.value)}
        placeholder="Search large list..."
      />

      {isPending && <Spinner size="sm" />}

      <Text>Result: {filteredList.length}</Text>

      {filteredList.slice(0, 10).map((item) => (
        <Text key={item}>{item}</Text>
      ))}
    </VStack>
  );
}
