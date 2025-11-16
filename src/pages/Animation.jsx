import { useState, useEffect, useRef } from "react";
import basketballImg from "../assets/basketball-png-1.png";
import footballImg from "../assets/football-png-32.png";
import courtImg from "../assets/wood-background.jpg";

export default function Animation() {
  const canvasRef = useRef(null);
  const [running, setRunning] = useState(false);
  const [objectType, setObjectType] = useState("none");
  const [angle, setAngle] = useState(Math.PI / 4); // 45 องศา
  const [pos, setPos] = useState({ x: 150, y: 150 });
  const [velocity, setVelocity] = useState({ vx: 3, vy: 3 });
  const [rotation, setRotation] = useState(0);

  // โหลดภาพ
  const images = {
    basketball: new Image(),
    football: new Image(),
  };
  images.basketball.src = basketballImg;
  images.football.src = footballImg;

  // ฟังก์ชันหลักสำหรับ animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    let frame;

    const drawBackground = () => {
      const bg = new Image();
      bg.src = courtImg;
      ctx.drawImage(bg, 0, 0, width, height);
    };

    const render = () => {
      drawBackground();

      if (objectType !== "none") {
        const img = images[objectType];
        const size = 80;

        // อัปเดตตำแหน่งและมุมหมุน
        let newX = pos.x + velocity.vx;
        let newY = pos.y + velocity.vy;
        let newVx = velocity.vx;
        let newVy = velocity.vy;
        let newRotation = rotation + 0.1;

        // กระเด้งขอบ
        if (newX + size / 2 > width || newX - size / 2 < 0) newVx *= -1;
        if (newY + size / 2 > height || newY - size / 2 < 0) newVy *= -1;

        // อัปเดตสถานะ
        setPos({ x: newX, y: newY });
        setVelocity({ vx: newVx, vy: newVy });
        setRotation(newRotation);

        // วาดภาพหมุน
        ctx.save();
        ctx.translate(newX, newY);
        ctx.rotate(newRotation);
        ctx.drawImage(img, -size / 2, -size / 2, size, size);
        ctx.restore();
      }

      if (running) frame = requestAnimationFrame(render);
    };

    if (running) frame = requestAnimationFrame(render);
    else drawBackground();

    return () => cancelAnimationFrame(frame);
  }, [running, pos, velocity, rotation, objectType]);

  // กดปุ่ม Spacebar → RUN / STOP
  // กดเลข 0–2 → เปลี่ยนวัตถุ
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === "Space") {
        setRunning((prev) => !prev);
      } else if (e.key === "0") setObjectType("none");
      else if (e.key === "1") setObjectType("basketball");
      else if (e.key === "2") setObjectType("football");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="border border-black rounded-lg shadow-md bg-cover bg-center"
      />
      <div className="flex gap-2">
        <button
          onClick={() => setRunning(!running)}
          className={`px-4 py-2 rounded-md font-semibold text-white shadow-md ${
            running ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {running ? "STOP" : "RUN"}
        </button>

        {["none", "basketball", "football"].map((type) => (
          <button
            key={type}
            onClick={() => setObjectType(type)}
            className={`px-4 py-2 rounded-md border font-medium ${
              objectType === type
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white hover:bg-gray-100 border-gray-300"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-700 mt-1">
        Keyboard: [0] None, [1] Basketball, [2] Football | [Space] RUN/STOP
      </p>
    </div>
  );
}
