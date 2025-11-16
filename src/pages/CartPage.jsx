import React from "react";
import CartItem from "../components/CartItem";

export default function CartPage({ cart = [], setCart }) {
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  //  ตรวจสอบว่า cart เป็น array และ price เป็นตัวเลขก่อน
  const total = Array.isArray(cart)
    ? cart.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0).toFixed(2)
    : "0.00";

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-semibold mb-4 text-sky-700">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">No items in your cart</p>
      ) : (
        <>
          <div className="flex flex-wrap justify-center gap-6 overflow-y-auto h-[60vh]">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                cartItem={item}
                removeFromCart={removeFromCart}
              />
            ))}
          </div>

          <div className="mt-6 flex justify-center items-center gap-4 text-lg font-semibold">
            <span>
              Products:{" "}
              <span className="bg-red-500 text-white px-2 py-1 rounded">
                {cart.length} items
              </span>
            </span>
            <span>
              Total price:{" "}
              <span className="bg-green-500 text-white px-2 py-1 rounded">
                ${total}
              </span>
            </span>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md font-semibold">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
