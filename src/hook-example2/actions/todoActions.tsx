export type AddTodoState = {
  error: string | null;
  text: string | null;
};

export const initialAddTodoState: AddTodoState = {
  error: null,
  text: null,
};

export async function addTodoAction(
  prevState: AddTodoState,
  formData: FormData
): Promise<AddTodoState> {
  const text = String(formData.get("todo") || "").trim();

  if (!text) {
    return {
      error: "Todo không được để trống",
      text: null,
    };
  }

  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    error: null,
    text,
  };
}
