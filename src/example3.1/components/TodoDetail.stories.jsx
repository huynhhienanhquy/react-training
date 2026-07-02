import TodoDetail from "./TodoDetail";

export default {
  title: "Example3.1/TodoDetail",
  component: TodoDetail,
};

export const NoSelection = {
  args: {
    todo: null,
  },
};

export const WithData = {
  args: {
    todo: {
      id: 1,
      title: "Learn React",
    },
  },
};
