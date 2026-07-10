import {
  Button,
  Field,
  HStack,
  Input,
  NativeSelect,
} from "@chakra-ui/react";
import { useEffect, useId, useRef } from "react";

type ProductSearchProps = {
  searchText: string;
  category: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onReset: () => void;
}

export function ProductSearch({
  searchText,
  category,
  onSearchChange,
  onCategoryChange,
  onReset,
}: ProductSearchProps) {
  //useRef is used to automatically focus on the search box.
  const inputRef = useRef<HTMLInputElement>(null);

  // useId creates a unique ID for the input
  const searchId = useId();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <HStack gap="3" align="end">
      <Field.Root>

        <Field.Label htmlFor={searchId}>
          Search product
        </Field.Label>

        <Input
          id={searchId}
          ref={inputRef}
          value={searchText}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by name..."
        >
        </Input>
      </Field.Root>

      <Field.Root>
        <Field.Label>
          Category
        </Field.Label>

        <NativeSelect.Root>
          <NativeSelect.Field
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
          >
            <option value="All">All</option>
            <option value="Laptop">Laptop</option>
            <option value="Phone">Phone</option>
            <option value="Monitor">Monitor</option>
            <option value="Accessory">Accessory</option>
          </NativeSelect.Field>

          <NativeSelect.Indicator>
          </NativeSelect.Indicator>

        </NativeSelect.Root>
      </Field.Root>

      <Button colorPalette="red" variant="outline" onClick={onReset}>
        Reset
      </Button>

    </HStack>
  )
}
