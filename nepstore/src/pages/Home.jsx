import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Shield, Truck, RefreshCw } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { SAMPLE_PRODUCTS } from "../utils/constants";

const Home = () => {
  const featuredProducts = SAMPLE_PRODUCTS.slice(0, 4);
  const newArrivals = SAMPLE_PRODUCTS.slice(4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl overflow-hidden mb-12">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Nepal's Best Online Store for Electronics & Fashion
              </h1>
              <p className="text-lg mb-8 text-blue-100">
                Discover amazing products at unbeatable prices. Fast delivery
                across Nepal with secure payment options.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/shop"
                  className="btn-primary bg-white text-blue-600 hover:bg-gray-100 flex items-center"
                >
                  Shop Now <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/shop?category=electronics"
                  className="btn-outline border-white text-white hover:bg-white/10"
                >
                  Browse Electronics
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop"
                alt="Shopping"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <Truck className="w-10 h-10 text-blue-600 mx-auto mb-3" />
          <h3 className="font-semibold mb-1">Free Delivery</h3>
          <p className="text-sm text-gray-600">All over Kathmandu Valley</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <Shield className="w-10 h-10 text-green-600 mx-auto mb-3" />
          <h3 className="font-semibold mb-1">Secure Payment</h3>
          <p className="text-sm text-gray-600">Khalti & Cash on Delivery</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <RefreshCw className="w-10 h-10 text-orange-600 mx-auto mb-3" />
          <h3 className="font-semibold mb-1">Easy Returns</h3>
          <p className="text-sm text-gray-600">7-day return policy</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <Star className="w-10 h-10 text-yellow-600 mx-auto mb-3" />
          <h3 className="font-semibold mb-1">Quality Guarantee</h3>
          <p className="text-sm text-gray-600">Authentic products only</p>
        </div>
      </div>

      {/* Featured Products */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link
            to="/shop"
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            View All <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/shop?category=electronics"
            className="relative overflow-hidden rounded-2xl group"
          >
            <img
              src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&auto=format&fit=crop"
              alt="Electronics"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center">
                <span className="text-4xl mb-2">💻</span>
                <h3 className="text-3xl font-bold text-white">Electronics</h3>
                <p className="text-white/80 mt-2">
                  Phones, Laptops, Headphones & more
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/shop?category=fashion"
            className="relative overflow-hidden rounded-2xl group"
          >
            <img
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop"
              alt="Fashion"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center">
                <span className="text-4xl mb-2">👕</span>
                <h3 className="text-3xl font-bold text-white">Fashion</h3>
                <p className="text-white/80 mt-2">
                  Clothing, Shoes, Accessories
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">New Arrivals</h2>
          <Link
            to="/shop?category=new"
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            See More <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
