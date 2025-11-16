import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    
    if (email.trim() && password.trim()) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      window.dispatchEvent(new Event("storage"));
      navigate("/");
    } else {
      alert("กรุณากรอกอีเมลและรหัสผ่านก่อนเข้าสู่ระบบ");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <h1 className="text-3xl font-bold text-sky-700 mb-2">Login Page</h1>
      <p className="text-gray-500 mb-6">
        เข้าสู่ระบบ (กรอกอีเมลและรหัสผ่านอะไรก็ได้)
      </p>

      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-2xl p-8 w-80 border border-sky-100"
      >
        <div className="mb-4 text-left">
          <label className="block text-gray-700 text-sm mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 outline-none"
            placeholder="กรอกอีเมลของคุณ"
          />
        </div>

        <div className="mb-6 text-left">
          <label className="block text-gray-700 text-sm mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 outline-none"
            placeholder="ใส่รหัสผ่านอะไรก็ได้"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-2 rounded-lg font-semibold hover:from-blue-500 hover:to-sky-600 hover:scale-105 transition-transform"
        >
          Login
        </button>
      </form>
    </div>
  );
}
