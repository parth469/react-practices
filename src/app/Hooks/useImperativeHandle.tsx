import {
  forwardRef,
  Ref,
  useImperativeHandle,
  useRef,
  useState,
  memo,
  useCallback,
} from "react";

interface CounterRef {
  reset: () => void;
  set100: () => void;
}

export const WithuseImperativeHandle = () => {
  const counterRef = useRef<CounterRef>(null);

  return (
    <>
      <Counter ref={counterRef} />
      <button onClick={() => counterRef.current?.reset()}>Reset</button>
      <button onClick={() => counterRef.current?.set100()}>Set to 100</button>
    </>
  );
};

const Counter = memo(
  forwardRef(function Counter(_, ref: Ref<CounterRef>) {
    const [count, setCount] = useState<number>(0);

    const reset = useCallback(() => {
      setCount(0);
    }, []);

    const set100 = useCallback(() => {
      setCount(100);
    }, []);

    const increment = useCallback(() => {
      setCount((prev) => prev + 1);
    }, []);

    const decrement = useCallback(() => {
      setCount((prev) => prev - 1);
    }, []);

    useImperativeHandle(ref, () => ({ reset, set100 }), [reset, set100]);

    return (
      <>
        <h1>{count}</h1>
        <button onClick={increment}>Increase</button>
        <button onClick={decrement}>Decrease</button>
      </>
    );
  })
);
