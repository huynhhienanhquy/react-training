import type { Meta, StoryObj } from "@storybook/react-vite";
import TodoForm from "./TodoForm";

const meta: Meta<typeof TodoForm> = {
  title: "Example3.1/TodoForm",
  component: TodoForm,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onAdd: (text: string) => {
      alert(`Add: ${text}`);
    },
  },
};
