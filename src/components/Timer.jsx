import { useState, useEffect, useRef } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  const toggle = () => {
    setRunning((r) => !r);
  };

  const reset = () => {
    setRunning(false);
    setSeconds(0);
  };

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [running]);

  const formatTime = (s) => {
    const days = Math.floor(s / 86400);
    const hrs = Math.floor((s % 86400) / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    return `${days}d : ${hrs}h : ${mins}m : ${secs}s`;
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4 rounded-xl shadow-md w-56">
      <p className="text-2xl font-bold text-gray-800 mb-2">{formatTime(seconds)}</p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
        >
          Reset
        </button>
        <button
          onClick={toggle}
          className={`px-4 py-1 rounded-md font-semibold text-white ${
            running ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {running ? "Pause" : "Run"}
        </button>
      </div>
    </div>
  );
}
