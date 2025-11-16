import { useState } from "react";

export default function Temperatures() {
  const [celsius, setCelsius] = useState(25);

  const fahrenheit = celsius * 9/5 + 32;
  const kelvin = celsius + 273.15;

  const updateFromC = (delta) => setCelsius((c) => c + delta);
  const updateFromF = (delta) => setCelsius(((fahrenheit + delta - 32) * 5) / 9);
  const updateFromK = (delta) => setCelsius((kelvin + delta) - 273.15);

  return (
    <div className="flex flex-col items-center bg-gray-50 p-4 rounded-xl shadow-md w-[750px]">
      <h3 className="text-xl font-bold text-blue-700 mb-2">TEMPERATURES</h3>
      <div className="grid grid-cols-3 gap-6">
        {/* Celsius */}
        <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow">
          <p className="text-blue-600 font-bold text-lg mb-1">
            {celsius.toFixed(2)} °C
          </p>
          <p className="font-semibold text-gray-700 mb-2">CELSIUS</p>
          <div className="flex gap-3">
            <button
              onClick={() => updateFromC(-1)}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
            >
              −
            </button>
            <button
              onClick={() => updateFromC(1)}
              className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
            >
              +
            </button>
          </div>
        </div>

        {/* Fahrenheit */}
        <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow">
          <p className="text-blue-600 font-bold text-lg mb-1">
            {fahrenheit.toFixed(2)} °F
          </p>
          <p className="font-semibold text-gray-700 mb-2">FAHRENHEIT</p>
          <div className="flex gap-3">
            <button
              onClick={() => updateFromF(-1)}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
            >
              −
            </button>
            <button
              onClick={() => updateFromF(1)}
              className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
            >
              +
            </button>
          </div>
        </div>

        {/* Kelvin */}
        <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow">
          <p className="text-blue-600 font-bold text-lg mb-1">
            {kelvin.toFixed(2)} K
          </p>
          <p className="font-semibold text-gray-700 mb-2">KELVIN</p>
          <div className="flex gap-3">
            <button
              onClick={() => updateFromK(-1)}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
            >
              −
            </button>
            <button
              onClick={() => updateFromK(1)}
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
