import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Home,
  Calculator,
  Sparkles,
  Layers,
  ListTodo,
  ShoppingBag,
  ShoppingCart,
  LogIn,
  LogOut,
} from "lucide-react";

export default function Navbar({ cartCount = 0 }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ตรวจสอบสถานะ Login
  const checkLoginStatus = () => {
    const status = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(status);
  };

  useEffect(() => {
    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    navigate("/");
  };

  const navItems = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Calculator", path: "/calculator", icon: <Calculator size={18} /> },
    { name: "Animation", path: "/animation", icon: <Sparkles size={18} /> },
    { name: "Component", path: "/component", icon: <Layers size={18} /> },
    { name: "Todos", path: "/todos", icon: <ListTodo size={18} /> },
    { name: "Products", path: "/products", icon: <ShoppingBag size={18} /> },
    {
      name: (
        <>
          Cart{" "}
          <span className="ml-1 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs">
            {cartCount}
          </span>
        </>
      ),
      path: "/cart",
      icon: <ShoppingCart size={18} />,
    },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-inner flex justify-between items-center px-6 py-3 border-b border-sky-200">
      {/* เมนูหลัก */}
      <div className="flex gap-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive
                  ? "bg-sky-500 text-white shadow-md"
                  : "text-sky-700 hover:bg-sky-100"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </div>

      {/* ปุ่ม Login / Logout */}
      <div>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white font-semibold px-4 py-2 rounded-full shadow hover:bg-red-600 transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold px-4 py-2 rounded-full shadow hover:from-blue-500 hover:to-sky-600 hover:scale-105 transition-transform"
          >
            <LogIn size={18} />
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
