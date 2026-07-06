import {
  startTransition,
  useActionState,
  useCallback,
  useDeferredValue,
  useMemo,
  useOptimistic,
  useReducer,
  useRef,
  useState,
  useTransition,
} from "react";

import { ThemeContext, type Theme } from "./context/ThemeContext";
import { useCSS } from "./hooks/useCSS";
import { useOnlineStatus } from "./hooks/useOnlineStatus";
import { todoReducer } from "./reducer/todoReducer";
import {
  addTodoAction,
  initialAddTodoState,
} from "./actions/todoActions";

import { Header } from "./components/Header";
import {
  SearchInput,
  type SearchInputHandle,
} from "./components/SearchInput";
import { TodoStats } from "./components/TodoStats";
import { TodoList } from "./components/TodoList";

export default function App() {
  /* useState: state UI đơn giản */
  const [theme, setTheme] = useState<Theme>("light");
  const [query, setQuery] = useState("");

  /* useReducer: quản lý danh sách todo */
  const [todos, dispatch] = useReducer(todoReducer, []);

  /* useTransition: cập nhật UI ở background */
  const [isPending, transition] = useTransition();

  /*
    useActionState:
    xử lý submit form async.

    initialAddTodoState phải có cùng shape
    với state mà addTodoAction return.
  */
  const [formState, submitTodo, isSubmitting] = useActionState(
    addTodoAction,
    initialAddTodoState
  );

  /*
    useOptimistic:
    thêm todo tạm thời ngay lập tức
    trước khi action/server xử lý xong.
  */
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (currentTodos, text: string) => [
      ...currentTodos,
      {
        id: crypto.randomUUID(),
        text,
        done: false,
        pending: true,
      },
    ]
  );

  /*
    useDeferredValue:
    query nhập vào update ngay,
    nhưng danh sách filter có thể update chậm hơn một nhịp.
  */
  const deferredQuery = useDeferredValue(query);

  /*
    useRef + useImperativeHandle:
    gọi method focus/clear từ SearchInput.
  */
  const searchInputRef = useRef<SearchInputHandle | null>(null);

  /*
    useSyncExternalStore nằm trong useOnlineStatus:
    subscribe trạng thái online/offline của browser.
  */
  const isOnline = useOnlineStatus();

  /*
    useInsertionEffect nằm trong useCSS:
    inject CSS runtime.
  */
  const className = useCSS(`
    .todo-card {
      padding: 16px;
      border: 1px solid #ddd;
      border-radius: 8px;
      margin-top: 12px;
    }
  `);

  /*
    useMemo:
    tránh tạo object context mới nếu theme không đổi.
  */
  const themeValue = useMemo(
    () => ({
      theme,
      toggleTheme() {
        setTheme((current) =>
          current === "light" ? "dark" : "light"
        );
      },
    }),
    [theme]
  );

  /*
    useMemo:
    cache kết quả filter todo.
  */
  const filteredTodos = useMemo(() => {
    return optimisticTodos.filter((todo) =>
      todo.text.toLowerCase().includes(deferredQuery.toLowerCase())
    );
  }, [optimisticTodos, deferredQuery]);

  /*
    useCallback:
    giữ stable callback để TodoList memo không re-render thừa.
  */
  const handleToggle = useCallback(
    (id: string) => {
      transition(() => {
        dispatch({
          type: "toggle",
          id,
        });
      });
    },
    [transition]
  );

  const handleDelete = useCallback(
    (id: string) => {
      transition(() => {
        dispatch({
          type: "delete",
          id,
        });
      });
    },
    [transition]
  );

  /*
    Form Action flow:

    1. Lấy text từ FormData
    2. Optimistic update
    3. Chạy useActionState action
    4. Nếu thành công thì update state thật bằng reducer
  */
  async function handleFormAction(formData: FormData) {
  const text = String(formData.get("todo") || "").trim();

  if (!text) {
    await submitTodo(formData);
    return;
  }

  addOptimisticTodo(text);

  await submitTodo(formData);

  startTransition(() => {
    dispatch({
      type: "add",
      text,
    });
  });
}

  return (
    <ThemeContext value={themeValue}>
      <div
        className={className}
        style={{
          background: theme === "dark" ? "#222" : "#fff",
          color: theme === "dark" ? "#fff" : "#111",
        }}
      >
        <Header />

        <p>Status: {isOnline ? "Online" : "Offline"}</p>

        <form action={handleFormAction}>
          <input name="todo" placeholder="New todo..." />

          <button disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add"}
          </button>
        </form>

        {formState.error && (
          <p style={{ color: "red" }}>{formState.error}</p>
        )}

        <SearchInput
          ref={searchInputRef}
          value={query}
          onChange={setQuery}
        />

        <button onClick={() => searchInputRef.current?.focus()}>
          Focus Search
        </button>

        <button onClick={() => searchInputRef.current?.clear()}>
          Clear Search
        </button>

        {isPending && <p>Updating in background...</p>}

        <TodoStats todos={optimisticTodos} />

        <TodoList
          todos={filteredTodos}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </div>
    </ThemeContext>
  );
}
