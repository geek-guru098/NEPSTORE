import React, { useState } from "react";
import { Filter, Grid, List } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { SAMPLE_PRODUCTS, CATEGORIES } from "../utils/constants";

const Shop = () => {
  const [view, setView] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = SAMPLE_PRODUCTS.filter((product) => {
    if (selectedCategory !== "all" && product.category !== selectedCategory) {
      return false;
    }
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Shop Products</h1>
        <p className="text-gray-600">
          Discover our curated collection of electronics and fashion items
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </h2>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setPriceRange([0, 200000]);
                }}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear All
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Category</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left px-3 py-2 rounded-lg ${
                    selectedCategory === "all"
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  All Products
                </button>
                {CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center ${
                      selectedCategory === category.id
                        ? "bg-blue-50 text-blue-600"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="200000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full"
                />
                <div className="flex justify-between text-sm">
                  <span>NPR 0</span>
                  <span>NPR {priceRange[1].toLocaleString()}</span>
                  <span>NPR 200,000</span>
                </div>
              </div>
            </div>

            {/* Sort By */}
            <div>
              <h3 className="font-medium mb-3">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow">
            <p className="text-gray-600">
              Showing {filteredProducts.length} of {SAMPLE_PRODUCTS.length}{" "}
              products
            </p>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setView("grid")}
                className={`p-2 rounded ${
                  view === "grid"
                    ? "bg-blue-100 text-blue-600"
                    : "hover:bg-gray-100"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2 rounded ${
                  view === "list"
                    ? "bg-blue-100 text-blue-600"
                    : "hover:bg-gray-100"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow">
              <p className="text-lg text-gray-600">
                No products found matching your filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setPriceRange([0, 200000]);
                }}
                className="mt-4 btn-primary"
              >
                Clear Filters
              </button>
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow p-6 flex"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="ml-6 flex-1">
                    <h3 className="text-xl font-semibold mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-3">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold">
                          NPR {product.price.toLocaleString()}
                        </span>
                        <p className="text-sm text-gray-500 mt-1">
                          {product.category} • {product.brand}
                        </p>
                      </div>
                      <button className="btn-primary">Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
