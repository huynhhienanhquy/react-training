export type Todo = {
  id: string;
  text: string;
  done: boolean;
  pending?: boolean;
};

export type TodoAction =
| { type: 'add'; text: string }
| { type: 'toggle'; id: string }
| { type: 'delete'; id: string };
