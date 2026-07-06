import { useRef } from "react";

export default function ClickCounter() {
  const clickRef = useRef(0);

  function handleClick() {
    clickRef.current++;

    alert(`Clicked ${clickRef.current} times`);
  }

  return (
    <>
      <h2>Click Counter</h2>

      <button onClick={handleClick}>
        Click Me
      </button>

      <hr />
    </>
  );
}
