import { useEffect, useState } from "react";
import { Clock, CheckCircle2, Trash2, Plus, X } from "lucide-react";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [filterWaiting, setFilterWaiting] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  // ดึงข้อมูลจาก API จริง
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos");
        const data = await res.json();

        const formatted = data.map((t) => ({
          id: t.id,
          title: t.title,
          completed: t.completed ? "done" : "waiting",
        }));

        setTodos(formatted);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  // Filter
  const filteredTodos = filterWaiting
    ? todos.filter((t) => t.completed === "waiting")
    : todos;

  // Pagination
  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedTodos = filteredTodos.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Toggle สถานะ
  const toggleStatus = (id) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, completed: t.completed === "done" ? "waiting" : "done" }
          : t
      )
    );
  };

  // ลบรายการ
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  // เพิ่มรายการใหม่
  const addTodo = () => {
    if (!newTitle.trim()) return;
    const newTodo = {
      id: todos.length + 1,
      title: newTitle.trim(),
      completed: "waiting",
    };
    setTodos([newTodo, ...todos]);
    setNewTitle("");
    setShowAddModal(false);
  };

  // เปลี่ยนหน้า
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-linear-to-b from-blue-50 to-sky-100">
        <p className="text-gray-600 text-lg font-semibold animate-pulse">
          Loading todos...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-[1080px] mx-auto min-h-screen bg-linear-to-b from-blue-50 to-sky-100 shadow-xl rounded-2xl overflow-hidden border border-sky-200 p-6">
      {/* Header + Add button */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={filterWaiting}
              onChange={(e) => {
                setFilterWaiting(e.target.checked);
                setCurrentPage(1);
              }}
              className="mr-2 w-5 h-5 accent-blue-600"
            />
            <span className="font-medium">Show only</span>
          </label>
          <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-md font-semibold text-sm flex items-center gap-1">
            waiting <Clock size={16} />
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Items per page */}
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-sky-300 rounded-lg px-3 py-1 text-sm bg-white focus:ring-2 focus:ring-sky-400"
          >
            <option value={5}>5 items per page</option>
            <option value={10}>10 items per page</option>
            <option value={50}>50 items per page</option>
            <option value={100}>100 items per page</option>
          </select>

          {/* Add button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center gap-1 font-semibold transition-transform active:scale-95 shadow"
          >
            <Plus size={18} />
            Add Todo
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-sky-200 rounded-xl bg-white shadow-sm">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-sky-800 text-white">
              <th className="p-2 w-16 text-center">ID</th>
              <th className="p-2">Title</th>
              <th className="p-2 w-40 text-center">Status</th>
              <th className="p-2 w-16 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedTodos.map((todo) => (
              <tr
                key={todo.id}
                className="border-b border-sky-100 hover:bg-sky-50 transition-colors"
              >
                <td className="text-center p-2 font-semibold text-gray-700">
                  {todo.id}
                </td>
                <td className="p-2">{todo.title}</td>
                <td className="text-center p-2">
                  {todo.completed === "waiting" ? (
                    <button
                      onClick={() => toggleStatus(todo.id)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold text-sm px-3 py-1 rounded-md transition-transform active:scale-95 flex items-center justify-center gap-1 mx-auto"
                    >
                      <Clock size={16} />
                      waiting
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleStatus(todo.id)}
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold text-sm px-3 py-1 rounded-md transition-transform active:scale-95 flex items-center justify-center gap-1 mx-auto"
                    >
                      <CheckCircle2 size={16} />
                      done
                    </button>
                  )}
                </td>
                <td className="text-center p-2">
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-transform active:scale-95 flex items-center justify-center mx-auto shadow"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {displayedTodos.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No todos found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2 text-sm">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded-md hover:bg-sky-50 disabled:opacity-50"
        >
          First
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded-md hover:bg-sky-50 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-2 py-1 text-gray-700">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded-md hover:bg-sky-50 disabled:opacity-50"
        >
          Next
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded-md hover:bg-sky-50 disabled:opacity-50"
        >
          Last
        </button>
      </div>

      {/* Modal Add Todo */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white w-[380px] rounded-xl shadow-xl p-5 border border-sky-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-sky-700">
                <Plus size={18} /> Add Todo
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-red-500 transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-3">
              <p className="text-sm font-semibold text-gray-600">
                ID: {todos.length + 1}
              </p>
            </div>

            <div className="mb-4 text-left">
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Title:
              </label>
              <input
                type="text"
                placeholder="Typing your todo title here..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-md bg-gray-400 hover:bg-gray-500 text-white font-semibold transition"
              >
                Close
              </button>
              <button
                onClick={addTodo}
                className="px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-700 text-white font-semibold transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
