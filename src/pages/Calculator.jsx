import { useState, useEffect } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [overwrite, setOverwrite] = useState(true);

  const handleNumber = (num) => {
    if (display === "Cannot divide by zero") return;
    if (overwrite) {
      setDisplay(num);
      setOverwrite(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperator = (op) => {
    if (display === "Cannot divide by zero") return;
    if (operator && !overwrite) calculate();
    else setPrevValue(parseFloat(display));
    setOperator(op);
    setOverwrite(true);
  };

  const calculate = () => {
    if (!operator || prevValue === null) return;
    const current = parseFloat(display);
    let result;

    switch (operator) {
      case "+": result = prevValue + current; break;
      case "-": result = prevValue - current; break;
      case "*": result = prevValue * current; break;
      case "/":
        result = current === 0 ? "Cannot divide by zero" : prevValue / current;
        break;
      default: return;
    }

    setDisplay(result.toString());
    setPrevValue(result === "Cannot divide by zero" ? null : result);
    setOperator(null);
    setOverwrite(true);
  };

  const handleClear = () => {
    setDisplay("0");
    setPrevValue(null);
    setOperator(null);
    setOverwrite(true);
  };

  const handleDelete = () => {
    if (overwrite || display === "Cannot divide by zero") {
      setDisplay("0");
      setOverwrite(true);
      return;
    }
    setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
  };

  const handleDecimal = () => {
    if (overwrite) {
      setDisplay("0.");
      setOverwrite(false);
      return;
    }
    if (!display.includes(".")) setDisplay(display + ".");
  };

  const handleNegate = () => {
    if (display === "Cannot divide by zero") return;
    setDisplay((parseFloat(display) * -1).toString());
  };

  const handlePercent = () => {
    if (display === "Cannot divide by zero") return;
    setDisplay((parseFloat(display) / 100).toString());
  };

  const handleSqrt = () => {
    const num = parseFloat(display);
    if (num < 0) {
      setDisplay("Invalid input");
      return;
    }
    setDisplay(Math.sqrt(num).toString());
    setOverwrite(true);
  };

  const handleReciprocal = () => {
    const num = parseFloat(display);
    if (num === 0) {
      setDisplay("Cannot divide by zero");
      return;
    }
    setDisplay((1 / num).toString());
    setOverwrite(true);
  };

  const handleKeyPress = (e) => {
    const key = e.key;
    if (!isNaN(key)) handleNumber(key);
    else if (key === ".") handleDecimal();
    else if (key === "+") handleOperator("+");
    else if (key === "-") handleOperator("-");
    else if (key === "*") handleOperator("*");
    else if (key === "/") handleOperator("/");
    else if (key === "Enter" || key === "=") calculate();
    else if (key === "Backspace") handleDelete();
    else if (key.toLowerCase() === "c") handleClear();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  });

  const buttons = [
    { label: "%", onClick: handlePercent, type: "func" },
    { label: "CE", onClick: handleClear, type: "func" },
    { label: "C", onClick: handleClear, type: "func" },
    { label: "⌫", onClick: handleDelete, type: "func" },
    { label: "1/x", onClick: handleReciprocal, type: "func" },
    { label: "x²", onClick: () => setDisplay((parseFloat(display) ** 2).toString()), type: "func" },
    { label: "√x", onClick: handleSqrt, type: "func" },
    { label: "÷", onClick: () => handleOperator("/"), type: "op" },
    { label: "7", onClick: () => handleNumber("7"), type: "num" },
    { label: "8", onClick: () => handleNumber("8"), type: "num" },
    { label: "9", onClick: () => handleNumber("9"), type: "num" },
    { label: "×", onClick: () => handleOperator("*"), type: "op" },
    { label: "4", onClick: () => handleNumber("4"), type: "num" },
    { label: "5", onClick: () => handleNumber("5"), type: "num" },
    { label: "6", onClick: () => handleNumber("6"), type: "num" },
    { label: "−", onClick: () => handleOperator("-"), type: "op" },
    { label: "1", onClick: () => handleNumber("1"), type: "num" },
    { label: "2", onClick: () => handleNumber("2"), type: "num" },
    { label: "3", onClick: () => handleNumber("3"), type: "num" },
    { label: "+", onClick: () => handleOperator("+"), type: "op" },
    { label: "±", onClick: handleNegate, type: "func" },
    { label: "0", onClick: () => handleNumber("0"), type: "num" },
    { label: ".", onClick: handleDecimal, type: "num" },
    { label: "=", onClick: calculate, type: "equal" },
  ];

  return (
    <div className="bg-gray-100 p-8 rounded-3xl shadow-2xl w-[360px] mx-auto border border-gray-300">
      {/* หน้าจอแสดงผล */}
      <div className="bg-white rounded-2xl p-5 text-right text-5xl font-mono text-gray-900 mb-5 shadow-inner h-24 flex items-end justify-end overflow-hidden select-none">
        {display}
      </div>

      {/* ปุ่มต่างๆ */}
      <div className="grid grid-cols-4 gap-3">
        {buttons.map((btn) => (
          <button
            key={btn.label}
            onClick={btn.onClick}
            className={`py-3 rounded-xl text-lg font-semibold transition-all duration-150 shadow-sm active:scale-95 
              ${
                btn.type === "num"
                  ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
                  : btn.type === "op"
                  ? "bg-sky-200 text-sky-900 hover:bg-sky-300"
                  : btn.type === "func"
                  ? "bg-gray-300 text-gray-800 hover:bg-gray-400"
                  : "bg-sky-500 text-white hover:bg-sky-600 shadow-md"
              }`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
