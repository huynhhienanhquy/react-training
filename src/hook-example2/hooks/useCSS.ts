import { useInsertionEffect } from "react";

const inserted = new Set<string>();

export function useCSS(rule: string) {
  useInsertionEffect(() => {
    if (!inserted.has(rule)) {
      inserted.add(rule);

      const style = document.createElement("style");
      style.textContent = rule;
      document.head.appendChild(style);
    }
  }, [rule]);

  return "todo-card";
}
