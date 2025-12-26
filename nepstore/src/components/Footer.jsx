import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="font-bold text-xl">N</span>
              </div>
              <span className="text-2xl font-bold">NepStore</span>
            </div>
            <p className="text-gray-300 mb-4">
              Nepal's premier online store for electronics and fashion. Quality
              products at best prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-pink-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/shop"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Shop All
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=electronics"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=fashion"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Fashion
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=new"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <MapPin className="w-5 h-5" />
                <span className="text-gray-300">Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5" />
                <span className="text-gray-300">+977 9800000000</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5" />
                <span className="text-gray-300">info@nepstore.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>
            &copy; {new Date().getFullYear()} NepStore. All rights reserved.
          </p>
          <p className="mt-2">Payment Methods: Khalti, Cash on Delivery</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
