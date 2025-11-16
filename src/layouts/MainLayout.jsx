import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout({ cartCount }) {
  return (
    <div className="flex flex-col w-full max-w-[1080px] mx-auto min-h-screen bg-linear-to-b from-blue-50 to-sky-100 shadow-xl rounded-2xl overflow-hidden border border-sky-200">
      <Header />
      <Navbar cartCount={cartCount} />
      <main className="flex-1 flex items-center justify-center p-6 text-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
