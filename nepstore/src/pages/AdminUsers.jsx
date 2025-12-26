import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "Customer",
  });

  // Load users from localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }

    // Try to load from localStorage first
    const savedUsers = localStorage.getItem("nepstoreUsers");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      // Default mock users
      const defaultUsers = [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          role: "Customer",
          status: "Active",
          joinDate: "2024-01-15",
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          role: "Customer",
          status: "Active",
          joinDate: "2024-02-20",
        },
        {
          id: 3,
          name: "Admin User",
          email: "admin@nepstore.com",
          role: "Admin",
          status: "Active",
          joinDate: "2024-01-01",
        },
      ];
      setUsers(defaultUsers);
      localStorage.setItem("nepstoreUsers", JSON.stringify(defaultUsers));
    }
  }, [navigate]);

  // Listen for new user registrations from other parts of the app
  useEffect(() => {
    const handleNewUser = (event) => {
      if (event.detail && event.detail.type === "NEW_USER") {
        const newUserData = {
          id: users.length + 1,
          name: event.detail.name,
          email: event.detail.email,
          role: "Customer",
          status: "Active",
          joinDate: new Date().toISOString().split("T")[0],
        };

        const updatedUsers = [...users, newUserData];
        setUsers(updatedUsers);
        localStorage.setItem("nepstoreUsers", JSON.stringify(updatedUsers));
      }
    };

    window.addEventListener("userRegistered", handleNewUser);

    // Also check localStorage periodically
    const interval = setInterval(() => {
      const savedUsers = localStorage.getItem("nepstoreUsers");
      if (savedUsers) {
        const parsedUsers = JSON.parse(savedUsers);
        if (parsedUsers.length !== users.length) {
          setUsers(parsedUsers);
        }
      }
    }, 5000); // Check every 5 seconds

    return () => {
      window.removeEventListener("userRegistered", handleNewUser);
      clearInterval(interval);
    };
  }, [users]);

  const toggleUserStatus = (userId) => {
    const updatedUsers = users.map((user) =>
      user.id === userId
        ? { ...user, status: user.status === "Active" ? "Suspended" : "Active" }
        : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("nepstoreUsers", JSON.stringify(updatedUsers));
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      const userToAdd = {
        id: users.length + 1,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: "Active",
        joinDate: new Date().toISOString().split("T")[0],
      };

      const updatedUsers = [...users, userToAdd];
      setUsers(updatedUsers);
      localStorage.setItem("nepstoreUsers", JSON.stringify(updatedUsers));
      setShowAddUser(false);
      setNewUser({ name: "", email: "", password: "", role: "Customer" });
    }
  };

  const deleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem("nepstoreUsers", JSON.stringify(updatedUsers));
  };

  // Function to manually trigger user registration (for testing)
  const simulateUserRegistration = () => {
    const testUsers = [
      { name: "Test User 1", email: "test1@example.com" },
      { name: "Test User 2", email: "test2@example.com" },
    ];

    const randomUser = testUsers[Math.floor(Math.random() * testUsers.length)];

    // Dispatch custom event
    const event = new CustomEvent("userRegistered", {
      detail: {
        type: "NEW_USER",
        ...randomUser,
      },
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Users</h1>
          <div className="space-x-4">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => setShowAddUser(true)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              + Add User
            </button>
            {/* For testing only - remove in production */}
            <button
              onClick={simulateUserRegistration}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Simulate Registration
            </button>
          </div>
        </div>

        {/* User stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold text-gray-600 mb-2">Total Users</h3>
            <p className="text-3xl font-bold">{users.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold text-gray-600 mb-2">Active Users</h3>
            <p className="text-3xl font-bold text-green-600">
              {users.filter((u) => u.status === "Active").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold text-gray-600 mb-2">Admins</h3>
            <p className="text-3xl font-bold text-red-600">
              {users.filter((u) => u.role === "Admin").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold text-gray-600 mb-2">New Today</h3>
            <p className="text-3xl font-bold text-blue-600">
              {
                users.filter(
                  (u) => u.joinDate === new Date().toISOString().split("T")[0]
                ).length
              }
            </p>
          </div>
        </div>

        {/* Users table */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Role</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Join Date</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{user.id}</td>
                    <td className="py-3 px-4 font-medium">{user.name}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          user.role === "Admin"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{user.joinDate}</td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-800 mr-3">
                        View
                      </button>
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`px-3 py-1 rounded text-sm mr-2 ${
                          user.status === "Active"
                            ? "bg-red-100 text-red-800 hover:bg-red-200"
                            : "bg-green-100 text-green-800 hover:bg-green-200"
                        }`}
                      >
                        {user.status === "Active" ? "Suspend" : "Activate"}
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add User Modal */}
        {showAddUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-md">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Add New User</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-2 border rounded"
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser({ ...newUser, name: e.target.value })
                    }
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full p-2 border rounded"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded"
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                  />
                  <select
                    className="w-full p-2 border rounded"
                    value={newUser.role}
                    onChange={(e) =>
                      setNewUser({ ...newUser, role: e.target.value })
                    }
                  >
                    <option value="Customer">Customer</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowAddUser(false)}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddUser}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Add User
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
