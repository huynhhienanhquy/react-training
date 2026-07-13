import {
  Button,
  Field,
  HStack,
  Input,
  VStack
} from "@chakra-ui/react";
import {
  useId,
  useRef,
  useState
} from "react";

export function FocusInput() {
  // useState management text
  const [name, setName] = useState("");

  //useRef manipulates DOM input
  const inputRef = useRef<HTMLInputElement>(null);

  //useId creates a secure ID for labels/inputs.
  const inputId =useId();

  return (
    <VStack align="stretch" borderWidth="1px" p="4" borderRadius="md">
      <Field.Root>
        <Field.Label htmlFor={inputId}>
          useState + useRef + useId
        </Field.Label>

        <HStack>
          <Input
            id={inputId}
            ref={inputRef}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your name"
          />

          <Button onClick={() => inputRef.current?.focus()}>
            Focus
          </Button>
        </HStack>
      </Field.Root>
    </VStack>
  );
}
