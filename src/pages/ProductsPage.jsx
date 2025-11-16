import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function ProductsPage({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ดึงข้อมูลจำลองจาก API (จำกัด 50 รายการ)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/photos?_limit=50");
        const data = await res.json();

        const colors = [
          "bg-green-400",
          "bg-pink-400",
          "bg-purple-400",
          "bg-blue-400",
          "bg-sky-400",
          "bg-indigo-400",
        ];
        const fakeProducts = data.map((item) => ({
          id: item.id,
          title: item.title,
          thumbnailUrl: item.thumbnailUrl,
          price: (Math.random() * 100 + 1).toFixed(2),
          color: colors[Math.floor(Math.random() * colors.length)],
        }));
        setProducts(fakeProducts);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    if (!cart.find((p) => p.id === product.id)) {
      setCart([...cart, product]);
    }
  };

  // คำนวณรายการสินค้าในแต่ละหน้า
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = products.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-sky-600 text-xl font-semibold">
        Loading products...
      </div>
    );
  }

  return (
    <div className="p-6 w-full text-center">
      <h1 className="text-2xl font-bold text-sky-700 mb-4">
        Products
      </h1>

      {/* แสดงสินค้า */}
      <div className="flex flex-wrap justify-center gap-5 overflow-y-auto h-[70vh]">
        {currentItems.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            isInCart={!!cart.find((p) => p.id === product.id)}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center items-center gap-4 text-sky-700 font-semibold">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md border border-sky-400 ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-sky-500 text-white hover:bg-sky-600"
          }`}
        >
          Prev
        </button>

        <span>
          Page{" "}
          <span className="bg-sky-500 text-white px-2 py-1 rounded">
            {currentPage}
          </span>{" "}
          of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-md border border-sky-400 ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-sky-500 text-white hover:bg-sky-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
