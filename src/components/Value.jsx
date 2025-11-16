import { useState } from "react";

export default function Value({ label, type = "integer", color = "blue" }) {
  const [value, setValue] = useState(0);

  const format = (val) =>
    type === "real" ? val.toFixed(2) : Math.round(val);

  const increment = () => setValue((v) => v + 1);
  const decrement = () => setValue((v) => v - 1);

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4 rounded-xl shadow-md w-48">
      <p
        className={`text-${color}-600 font-bold text-lg bg-${color}-100 px-3 py-1 rounded-md mb-2`}
      >
        {format(value)}
      </p>
      <p className="font-semibold text-gray-700">{label}</p>
      <div className="flex gap-3 mt-2">
        <button
          onClick={decrement}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
        >
          −
        </button>
        <button
          onClick={increment}
          className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
        >
          +
        </button>
      </div>
    </div>
  );
}
