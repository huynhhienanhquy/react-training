import { useRef } from "react";

export default function AutoSave() {
  const intervalRef = useRef<number | null>(null);

  function handleStart() {
    if (intervalRef.current !== null) return;

    intervalRef.current = window.setInterval(() => {
      console.log("Auto Saving...");
    }, 2000);
  }

  function handleStop() {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  return (
    <>
      <h2>Auto Save</h2>

      <button onClick={handleStart}>Start</button>

      <button onClick={handleStop}>Stop</button>
    </>
  );
}
