import type { Meta, StoryObj } from "@storybook/react-vite";
import TodoItem from "./TodoItem";

const meta: Meta<typeof TodoItem> = {
  title: "Example3.1/TodoItem",
  component: TodoItem,
};

export default meta;

type Story = StoryObj<typeof meta>;

const todo = {
  id: 1,
  text: "Learn React",
};

export const Normal: Story = {
  args: {
    todo,
    isSelected: false,
    onSelect: (id: number) => {
      alert(`Selected ${id}`);
    },
  },
};

export const Selected: Story = {
  args: {
    todo,
    isSelected: true,
    onSelect: (id: number) => {
      alert(`Selected ${id}`);
    },
  },
};
