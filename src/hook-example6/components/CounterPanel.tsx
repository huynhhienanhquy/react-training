import {
  Button,
  HStack,
  Text,
  VStack
} from "@chakra-ui/react";
import { useReducer } from "react";
import { counterReducer } from "../reducer/counterReducer";

export function CounterPanel() {
  // useReducer manages state by action.
  const  [count, dispatch] = useReducer(counterReducer, 0);

  return (
    <VStack align="stretch" borderWidth="1px" p="4" borderRadius="md">
      <Text fontWeight="bold">
        useReducer
      </Text>

      <Text>
        Count: {count}
      </Text>

      <HStack>
        <Button onClick={() => dispatch({ type: "DECREASE" })}>-</Button>
        <Button onClick={() => dispatch({ type: "INCREASE" })}>+</Button>
        <Button onClick={() => dispatch({ type: "RESET" })}>Reset</Button>
      </HStack>
    </VStack>
  )
}
