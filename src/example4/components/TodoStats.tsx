import { useEffect, useRef } from "react";

interface Props {
  count: number;
}

export default function TodoStats({ count }: Props) {
  const previousCountRef = useRef(count);

  useEffect(() => {
    console.log(
      `Previous Todo: ${previousCountRef.current}, Current Todo: ${count}`
    );

    previousCountRef.current = count;
  }, [count]);

  return (
    <>
      <h2>Todo Stats</h2>

      <p>Current Todo: {count}</p>

      <p>Previous Todo.</p>

      <hr />
    </>
  );
}
