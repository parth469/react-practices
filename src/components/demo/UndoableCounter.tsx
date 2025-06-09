import { useState } from "react";

type ACTION = "-100" | "-10" | "-1" | "+100" | "+10" | "+1";

interface Counter {
  current: number;
  prev: number;
  action: ACTION;
  id: number;
}

export const UndoableCounter = () => {
  const [counterHistory, setCounterHistory] = useState<Counter[]>([]);
  const [currentState, setCurrentState] = useState(0);

  const update = (action: ACTION) => {
    const id = Date.now();
    const value = parseInt(action);

    const prev =
      currentState > 0 ? counterHistory[currentState - 1].current : 0;
    const current = prev + value;

    const newAction: Counter = {
      id,
      action,
      prev,
      current,
    };

    const updatedHistory = [
      ...counterHistory.slice(0, currentState),
      newAction,
    ];

    setCounterHistory(updatedHistory);
    setCurrentState((prev) => prev + 1);
  };

  const handleUndo = () => {
    if (currentState > 0) setCurrentState((prev) => prev - 1);
  };

  const handleRedo = () => {
    if (currentState < counterHistory.length)
      setCurrentState((prev) => prev + 1);
  };

  return (
    <div className="bg-white shadow-xl p-8 rounded-2xl flex flex-col gap-6 w-full max-w-xl m-auto mt-20">
      <h2 className="text-xl font-bold text-center">🔁 Undoable Counter</h2>

      <div className="flex gap-4 justify-center">
        <button
          onClick={handleUndo}
          disabled={currentState === 0}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Undo
        </button>
        <button
          onClick={handleRedo}
          disabled={currentState === counterHistory.length}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Redo
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {["-100", "-10", "-1", "+1", "+10", "+100"].map((val) => (
          <button
            key={val}
            onClick={() => update(val as ACTION)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {val}
          </button>
        ))}
      </div>

      <div className="text-center text-xl font-semibold">
        Current Value:{" "}
        {currentState > 0 ? counterHistory[currentState - 1].current : 0}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">History (Latest on top):</h3>
        <div className="space-y-1">
          {counterHistory
            .slice(0, currentState) // Only show current state slice
            .reverse() // show latest on top
            .map((entry) => (
              <div
                key={entry.id}
                className="bg-gray-100 px-4 py-2 rounded shadow-sm flex justify-between"
              >
                <span>Action: {entry.action}</span>
                <span>
                  {entry.prev} → <strong>{entry.current}</strong>
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
