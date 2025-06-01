import { useDeferredValue, useMemo, useState } from "react";

export const Without = () => {
  const [query, setQuery] = useState("");

  return (
    <>
      <label htmlFor="">Input</label>
      <br />
      <input
        className="bg-black text-amber-100"
        onChange={(e) => setQuery(e.target.value)}
      />
      {[...Array(10000)].map((e) => (
        <div style={{ color: "black" }} key={e}>
          text:{query}
        </div>
      ))}
    </>
  );
};

export const WithuseDeferredValue = () => {
  const [query, setQuery] = useState("");
  const DeferredValue = useDeferredValue(query);

  const list = useMemo(() => {
    return [...Array(10000)].map((_, id) => (
      <div style={{ color: "black" }} key={id}>
        text: {DeferredValue}
      </div>
    ));
  }, [DeferredValue]);

  return (
    <>
      <label htmlFor="">Input</label>
      <br />
      <input
        className="bg-black text-amber-100"
        onChange={(e) => setQuery(e.target.value)}
      />
      {list}
    </>
  );
};
