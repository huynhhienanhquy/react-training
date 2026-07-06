import {
  useId,
  useImperativeHandle,
  useRef,
} from "react";

import type { Ref } from "react";

export type SearchInputHandle = {
  focus: () => void;
  clear: () => void;
};

type SearchInputProps = {
  ref: Ref<SearchInputHandle>;
  value: string;
  onChange: (value: string) => void;
};

export function SearchInput({ ref, value, onChange }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputId = useId();

  useImperativeHandle(
    ref,
    () => ({
      focus() {
        inputRef.current?.focus();
      },
      clear() {
        onChange("");
        inputRef.current?.focus();
      },
    }),
    [onChange]
  );

  return (
    <div>
      <label htmlFor={inputId}>Search todo:</label>
      <input
        id={inputId}
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
}
