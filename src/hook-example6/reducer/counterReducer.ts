export type CounterAction =
  | { type: "INCREASE" }
  | { type: "DECREASE" }
  | { type: "RESET" };

export function counterReducer(state: number, action: CounterAction) {
  switch (action.type) {
    case "INCREASE":
      return state + 1;

    case "DECREASE":
      return state - 1;

    case "RESET":
      return 0;

    default:
      return state;
  }
}
