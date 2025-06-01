"use client";
import { useCallback, useEffect, useState } from "react";

const Child = ({ onClick }: { onClick: () => void }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Child Button</button>;
};

export const CallbackExample = () => {
  const [update, setUpdate] = useState(0);
  const [second, setSecond] = useState(0);

  const notCachedFn = () => {
    console.log("notCachedFn: update =", update);
  };

  const cachedWithUpdateFn = useCallback(() => {
    console.log("cachedWithUpdateFn: update =", update, second);
  }, [update]);

  const cachedFn = useCallback(() => {
    console.log("cachedFn runs (no deps)");
  }, []);

  useEffect(() => {
    console.log("useEffect triggered by cachedWithUpdateFn change");
  }, [cachedWithUpdateFn]);

  return (
    <>
      <p>Update: {update}</p>
      <p>Second: {second}</p>
      <br />

      <button onClick={() => setUpdate((e) => e + 1)}>Increment Update</button>
      <br />

      <button onClick={() => setSecond((e) => e + 1)}>Increment Second</button>
      <br />

      <button onClick={notCachedFn}>Run notCachedFn</button>
      <br />
      <button onClick={cachedWithUpdateFn}>Run cachedWithUpdateFn</button>
      <br />
      <button onClick={cachedFn}>Run cachedFn</button>
      <br />

      {/* Demonstrates child render on prop change */}
      <Child onClick={()=>console.log("cachedWithUpdateFn: update =", update, second)} />
    </>
  );
};
