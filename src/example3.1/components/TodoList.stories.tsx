import type { Meta, StoryObj } from "@storybook/react-vite";
import TodoList from "./TodoList";
import type { Todo } from "../type";

const meta: Meta<typeof TodoList> = {
  title: "Example3.1/TodoList",
  component: TodoList,
};

export default meta;

type Story = StoryObj<typeof meta>;

const todos: Todo[] = [
  {
    id: 1,
    text: "Learn React",
  },
  {
    id: 2,
    text: "Learn TypeScript",
  },
  {
    id: 3,
    text: "Learn Storybook",
  },
];

export const Default: Story = {
  args: {
    todos,
    selectedId: 2,
    onSelect: (id: number) => {
      alert(`Selected ${id}`);
    },
  },
};

export const Empty: Story = {
  args: {
    todos: [],
    selectedId: null,
    onSelect: () => {},
  },
};
