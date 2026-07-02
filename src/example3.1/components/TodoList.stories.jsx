import TodoList from './TodoList'

export default {
  title: 'Example3.1/TodoList',
  component: TodoList,
}

const todos = [
  { id: 1, title: 'Learn React' },
  { id: 2, title: 'Learn TypeScript' },
  { id: 3, title: 'Learn Storybook' },
]

export const Default = {
  args: {
    todos,
    selectedId: 2,
    onSelect: (id) => alert(`Selected ${id}`),
  },
}

export const Empty = {
  args: {
    todos: [],
    selectedId: null,
    onSelect: () => {},
  },
}
