import { Link } from "react-router-dom";

const AdminSidebar = ({ onLogout }) => {
  return (
    <div className="w-64 bg-gray-800 text-white">
      <div className="p-6">
        <h2 className="text-xl font-bold">NepStore Admin</h2>
      </div>

      <nav className="mt-6">
        <Link
          to="/admin/dashboard"
          className="block py-3 px-6 hover:bg-gray-700"
        >
          📊 Dashboard
        </Link>
        <Link
          to="/admin/products"
          className="block py-3 px-6 hover:bg-gray-700"
        >
          📦 Products
        </Link>
        <Link to="/admin/orders" className="block py-3 px-6 hover:bg-gray-700">
          🛒 Orders
        </Link>
        <Link to="/admin/users" className="block py-3 px-6 hover:bg-gray-700">
          👥 Users
        </Link>
        <Link
          to="/admin/categories"
          className="block py-3 px-6 hover:bg-gray-700"
        >
          🏷️ Categories
        </Link>
        <Link
          to="/admin/settings"
          className="block py-3 px-6 hover:bg-gray-700"
        >
          ⚙️ Settings
        </Link>

        <button
          onClick={onLogout}
          className="w-full text-left py-3 px-6 hover:bg-gray-700 text-red-400 mt-4"
        >
          🚪 Logout
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;
