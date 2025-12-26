import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    totalOrders: 125,
    totalRevenue: 450000,
    totalProducts: 89,
    totalUsers: 256,
  });
  const [editData, setEditData] = useState({ ...dashboardData });

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const handleAddProduct = () => {
    navigate("/admin/products");
  };

  const handleViewOrders = () => {
    navigate("/admin/orders");
  };

  const handleManageUsers = () => {
    navigate("/admin/users");
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditData({ ...dashboardData });
  };

  const handleSaveClick = () => {
    setDashboardData({ ...editData });
    setIsEditing(false);
    // Here you would typically make an API call to save the data
    console.log("Saving dashboard data:", editData);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditData({ ...dashboardData });
  };

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex space-x-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSaveClick}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancelClick}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleEditClick}
                className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
              >
                Edit Dashboard
              </button>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Orders Card */}
          <div className="bg-white p-6 rounded-lg shadow relative">
            {isEditing && (
              <div className="absolute -top-2 -right-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-100 text-blue-600 p-1 rounded-full hover:bg-blue-200"
                >
                  ✎
                </button>
              </div>
            )}
            <h3 className="text-lg font-semibold text-gray-600">
              Total Orders
            </h3>
            {isEditing ? (
              <input
                type="number"
                value={editData.totalOrders}
                onChange={(e) =>
                  handleInputChange(
                    "totalOrders",
                    parseInt(e.target.value) || 0
                  )
                }
                className="text-3xl font-bold mt-2 w-full border border-gray-300 rounded px-2 py-1"
              />
            ) : (
              <p className="text-3xl font-bold mt-2">
                {dashboardData.totalOrders}
              </p>
            )}
          </div>

          {/* Total Revenue Card */}
          <div className="bg-white p-6 rounded-lg shadow relative">
            {isEditing && (
              <div className="absolute -top-2 -right-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-100 text-blue-600 p-1 rounded-full hover:bg-blue-200"
                >
                  ✎
                </button>
              </div>
            )}
            <h3 className="text-lg font-semibold text-gray-600">
              Total Revenue
            </h3>
            {isEditing ? (
              <input
                type="number"
                value={editData.totalRevenue}
                onChange={(e) =>
                  handleInputChange(
                    "totalRevenue",
                    parseInt(e.target.value) || 0
                  )
                }
                className="text-3xl font-bold mt-2 w-full border border-gray-300 rounded px-2 py-1"
              />
            ) : (
              <p className="text-3xl font-bold mt-2">
                {formatCurrency(dashboardData.totalRevenue)}
              </p>
            )}
          </div>

          {/* Total Products Card */}
          <div className="bg-white p-6 rounded-lg shadow relative">
            {isEditing && (
              <div className="absolute -top-2 -right-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-100 text-blue-600 p-1 rounded-full hover:bg-blue-200"
                >
                  ✎
                </button>
              </div>
            )}
            <h3 className="text-lg font-semibold text-gray-600">
              Total Products
            </h3>
            {isEditing ? (
              <input
                type="number"
                value={editData.totalProducts}
                onChange={(e) =>
                  handleInputChange(
                    "totalProducts",
                    parseInt(e.target.value) || 0
                  )
                }
                className="text-3xl font-bold mt-2 w-full border border-gray-300 rounded px-2 py-1"
              />
            ) : (
              <p className="text-3xl font-bold mt-2">
                {dashboardData.totalProducts}
              </p>
            )}
          </div>

          {/* Total Users Card */}
          <div className="bg-white p-6 rounded-lg shadow relative">
            {isEditing && (
              <div className="absolute -top-2 -right-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-100 text-blue-600 p-1 rounded-full hover:bg-blue-200"
                >
                  ✎
                </button>
              </div>
            )}
            <h3 className="text-lg font-semibold text-gray-600">Total Users</h3>
            {isEditing ? (
              <input
                type="number"
                value={editData.totalUsers}
                onChange={(e) =>
                  handleInputChange("totalUsers", parseInt(e.target.value) || 0)
                }
                className="text-3xl font-bold mt-2 w-full border border-gray-300 rounded px-2 py-1"
              />
            ) : (
              <p className="text-3xl font-bold mt-2">
                {dashboardData.totalUsers}
              </p>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="flex space-x-4">
            <button
              onClick={handleAddProduct}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add New Product
            </button>
            <button
              onClick={handleViewOrders}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              View Orders
            </button>
            <button
              onClick={handleManageUsers}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Manage Users
            </button>
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-700">
              ⚠️ <strong>Note:</strong> Editing dashboard statistics. This will
              only update the displayed values. To actually update real data,
              use the respective management sections.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
