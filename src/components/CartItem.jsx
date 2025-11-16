import React from "react";

export default function CartItem({ cartItem, removeFromCart }) {
  return (
    <div className="bg-white rounded-xl shadow-sm w-48 h-70 p-3 border border-gray-200 text-center flex flex-col justify-between hover:shadow-md transition-all duration-200">
      {/* ภาพสินค้า */}
      <div className="w-full h-28 rounded-md overflow-hidden mb-2">
        <img
          src={cartItem.thumbnailUrl || "https://picsum.photos/150"}
          alt={cartItem.title}
          onError={(e) => (e.target.src = "https://picsum.photos/150")}
          className="w-full h-full object-cover"
        />
      </div>

      {/* รายละเอียดสินค้า */}
      <div className="flex flex-col justify-between flex-1">
        <p className="text-xs text-gray-700 line-clamp-2 h-8 leading-snug">
          {cartItem.title}
        </p>

        <p className="text-gray-900 font-semibold mt-1">${cartItem.price}</p>

        {/* ปุ่ม Remove */}
        <button
          onClick={() => removeFromCart(cartItem.id)}
          className="mt-2 bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-md transition-colors duration-200"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
