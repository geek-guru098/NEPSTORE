import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "electronics",
    price: "",
    stock: "",
    description: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
    // Mock data
    setProducts([
      {
        id: 1,
        name: "Smartphone X",
        category: "Electronics",
        price: 45000,
        stock: 25,
      },
      {
        id: 2,
        name: "Men's T-Shirt",
        category: "Fashion",
        price: 1200,
        stock: 50,
      },
      {
        id: 3,
        name: "Laptop Pro",
        category: "Electronics",
        price: 125000,
        stock: 12,
      },
      {
        id: 4,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 3500,
        stock: 30,
      },
    ]);
  }, [navigate]);

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price) {
      const newProd = {
        id: products.length + 1,
        ...newProduct,
        price: parseInt(newProduct.price),
        stock: parseInt(newProduct.stock),
      };
      setProducts([...products, newProd]);
      setShowAddModal(false);
      setNewProduct({
        name: "",
        category: "electronics",
        price: "",
        stock: "",
        description: "",
      });
    }
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Products</h1>
          <div className="space-x-4">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              + Add Product
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Product Name</th>
                  <th className="py-3 px-4 text-left">Category</th>
                  <th className="py-3 px-4 text-left">Price (Rs)</th>
                  <th className="py-3 px-4 text-left">Stock</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{product.id}</td>
                    <td className="py-3 px-4 font-medium">{product.name}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          product.category === "Electronics"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {product.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      Rs {product.price.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded ${
                          product.stock > 20
                            ? "bg-green-100 text-green-800"
                            : product.stock > 0
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.stock} units
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-800 mr-3">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
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
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Add New Product</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  className="w-full p-2 border rounded"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                />
                <select
                  className="w-full p-2 border rounded"
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                >
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="home">Home & Kitchen</option>
                  <option value="books">Books</option>
                </select>
                <input
                  type="number"
                  placeholder="Price (Rs)"
                  className="w-full p-2 border rounded"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Stock Quantity"
                  className="w-full p-2 border rounded"
                  value={newProduct.stock}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, stock: e.target.value })
                  }
                />
                <textarea
                  placeholder="Description"
                  className="w-full p-2 border rounded"
                  rows="3"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProduct}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
