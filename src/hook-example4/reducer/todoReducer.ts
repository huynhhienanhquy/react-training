export type Todo = {
  id: number;
  title: string;
  completed: boolean;
}

export type TodoAction =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: number }
  | { type: "DELETE_TODO"; payload: number }
  | { type: "CLEAR_COMPLETED" };

//Reducers are used to manage more complex state than useState.
export function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: Date.now(),
          title: action.payload,
          completed: false,
        },
      ];

      case "TOGGLE_TODO":
        return state.map((todo) =>
          todo.id === action.payload
            ? {...todo, completed: !todo.completed}
            : todo
        );

        case "CLEAR_COMPLETED":
          return state.filter((todo) => !todo.completed);

        default:
          return state;
  }
}
