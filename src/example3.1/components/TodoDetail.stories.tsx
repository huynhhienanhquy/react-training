import type { Meta, StoryObj } from "@storybook/react-vite";
import TodoDetail from "./TodoDetail";

const meta: Meta<typeof TodoDetail> = {
  title: "Example3.1/TodoDetail",
  component: TodoDetail,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const NoSelection: Story = {
  args: {
    todo: null,
  },
};

export const WithData: Story = {
  args: {
    todo: {
      id: 1,
      text: "Learn React",
    },
  },
};
