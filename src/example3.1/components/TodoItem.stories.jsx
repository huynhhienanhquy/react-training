import TodoItem from './TodoItem'

export default {
  title: 'Example3.1/TodoItem',
  component: TodoItem,
}

const todo = {
  id: 1,
  text: 'Learn React',
}

export const Normal = {
  args: {
    todo,
    isSelected: false,
    onSelect: (id) => alert(`Selected ${id}`),
  },
}

export const Selected = {
  args: {
    todo,
    isSelected: true,
    onSelect: (id) => alert(`Selected ${id}`),
  },
}
