import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Animation from "./pages/Animation";
import ComponentPage from "./pages/Components";
import Todos from "./pages/Todos";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";

import "./App.css";

export default function App() {
  const [cart, setCart] = useState([]);

  return (
    <BrowserRouter basename="/csi205/">
      <Routes>
        <Route element={<MainLayout cartCount={cart.length} />}>
          <Route index element={<Home />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/animation" element={<Animation />} />
          <Route path="/component" element={<ComponentPage />} />
          <Route path="/todos" element={<Todos />} />
          <Route
            path="/products"
            element={<ProductsPage cart={cart} setCart={setCart} />}
          />
          <Route
            path="/cart"
            element={<CartPage cart={cart} setCart={setCart} />}
          />


          {/* LoginPage */}
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
