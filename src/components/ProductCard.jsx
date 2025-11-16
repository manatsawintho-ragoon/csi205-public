import React from "react";

export default function ProductCard({ product, addToCart, isInCart }) {
  return (
    <div className="bg-white rounded-lg shadow-md w-44 h-75 p-2 border border-gray-200 text-center">
      <div
        className={`${product.color} w-full h-40 rounded-md overflow-hidden flex items-center justify-center`}
      >
        <img
          src={product.thumbnailUrl}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      <p className="mt-2 text-xs text-gray-700 h-10 overflow-hidden">
        {product.title}
      </p>
      <p className="text-gray-800 font-semibold">${product.price}</p>

      {isInCart ? (
        <button
          disabled
          className="mt-2 bg-red-500 text-white text-xs px-3 py-1 rounded-md cursor-not-allowed"
        >
          added to carts
        </button>
      ) : (
        <button
          onClick={() => addToCart(product)}
          className="mt-2 bg-sky-500 hover:bg-sky-600 text-white text-xs px-3 py-1 rounded-md"
        >
          Add to carts
        </button>
      )}
    </div>
  );
}
