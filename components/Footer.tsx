"use client";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-800 border-t border-gray-200">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Brand Info */}
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-blue-500 mb-3">Logo</h2>
          <p className="text-sm text-gray-600 mb-5 leading-relaxed max-w-xs sm:max-w-sm mx-auto sm:mx-0">
            About company
          </p>

          <form className="flex flex-col sm:flex-row justify-center sm:justify-start items-center sm:items-stretch">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 border border-gray-300 rounded-md sm:rounded-l-md sm:rounded-r-none focus:outline-none focus:ring-1 focus:ring-yellow-500 w-full sm:w-auto sm:flex-1 mb-3 sm:mb-0"
            />
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-md sm:rounded-l-none sm:rounded-r-md transition w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Quick Links */}
        <div className=" text-center ">
          <h3 className="text-xl font-semibold text-blue-500 mb-4">
            Quick Links
          </h3>
          <ul className=" flex justify-center items-center space-x-2 font-medium">
            <li>
              <a href="/" className="hover:text-red-600 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-red-600 transition">
                About
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-red-600 transition">
                Services
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-red-600 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="text-center sm:text-left lg:text-right">
          <h3 className="text-xl font-semibold text-blue-500 mb-4">
            Get in Touch
          </h3>
          <p className="text-sm mb-1">
            <span className="font-semibold">Phone:</span>{" "}
            <a href="tel:+91" className="hover:text-red-600 transition">
              +91 9565837423
            </a>
          </p>
          <p className="text-sm mb-4">
            <span className="font-semibold">Email:</span>{" "}
            <a
              href="mailto:contact@halwaiwala.com"
              className="hover:text-red-600 transition"
            >
              contact@construction.com
            </a>
          </p>

          {/* Social Icons */}
          <div className="flex justify-center sm:justify-start lg:justify-end space-x-3">
            <a
              href="#"
              className="bg-white shadow p-2 rounded-full hover:bg-red-100 transition"
            >
              <Facebook size={18} className="text-gray-800" />
            </a>
            <a
              href="#"
              className="bg-white shadow p-2 rounded-full hover:bg-red-100 transition"
            >
              <Twitter size={18} className="text-gray-800" />
            </a>
            <a
              href="#"
              className="bg-white shadow p-2 rounded-full hover:bg-red-100 transition"
            >
              <Instagram size={18} className="text-gray-800" />
            </a>
            <a
              href="#"
              className="bg-white shadow p-2 rounded-full hover:bg-red-100 transition"
            >
              <Linkedin size={18} className="text-gray-800" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-center md:justify-between px-6 lg:px-12 max-w-7xl mx-auto space-y-2 md:space-y-0">
        <p>© 2025 Tekyatra. All Rights Reserved.</p>
        <div className="flex justify-center flex-wrap gap-4">
          <a href="#" className="hover:text-red-600 transition">
            Terms of Service
          </a>
          <a href="#" className="hover:text-red-600 transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-red-600 transition">
            Refund Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
