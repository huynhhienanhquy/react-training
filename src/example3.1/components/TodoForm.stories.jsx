import TodoForm from "./TodoForm";

export default {
  title: "Example3.1/TodoForm",
  component: TodoForm,
};

export const Default = {
  args: {
    onAdd: (text) => alert(`Add: ${text}`),
  },
};
