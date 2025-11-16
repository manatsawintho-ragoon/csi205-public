import { useState } from "react";
import Value from "./Value";

export default function Adder() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  const handleChangeA = (delta) => setA((x) => x + delta);
  const handleChangeB = (delta) => setB((x) => x + delta);

  return (
    <div className="flex flex-col items-center bg-gray-50 p-4 rounded-xl shadow-md w-[460px]">
      <p className="font-bold text-xl text-blue-700 mb-2">
        A + B = {a + b}
      </p>
      <div className="flex gap-6">
        <div className="flex flex-col items-center">
          <p className="font-semibold text-gray-700 mb-1">A = {a}</p>
          <div className="flex gap-2">
            <button
              onClick={() => handleChangeA(-1)}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
            >
              −
            </button>
            <button
              onClick={() => handleChangeA(1)}
              className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-semibold text-gray-700 mb-1">B = {b}</p>
          <div className="flex gap-2">
            <button
              onClick={() => handleChangeB(-1)}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
            >
              −
            </button>
            <button
              onClick={() => handleChangeB(1)}
              className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
