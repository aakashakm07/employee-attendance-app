"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-center">
      <div
        className="w-[85%]  md:max-w-6xl mt-3 bg-white/20 backdrop-blur-md  border border-red-500/30 hover:shadow-[0_0_20px_rgba(255,0,0,0.4)] transition-shadow duration-300
 rounded-2xl shadow-md px-4 md:px-6 py-3 flex items-center justify-between"
      >
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="Logo Here"
            width={40}
            height={40}
            className="object-contain"
          />
          <div className="leading-tight">
            <h1 className="text-red-600 font-bold text-lg">
              House<span className="text-blue-600">Builders</span>
            </h1>
            <p className="text-xs text-gray-300">CONSTRUCTION SERVICES</p>
          </div>
        </div>

        {/* Center Menu (Desktop & Tablet) */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8 text-white font-semibold">
          <Link
            href="/"
            className="text-blue-600 hover:text-red-500 transition"
          >
            HOME
          </Link>
          <Link href="/about" className="hover:text-blue-500 transition">
            ABOUT US
          </Link>
          <Link href="/services" className="hover:text-blue-500 transition">
            SERVICES
          </Link>
          <Link href="/contact" className="hover:text-blue-500 transition">
            CONTACT
          </Link>

          {/* Login/Dashboard Button */}
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="bg-gray-100 text-red-600 px-3 py-1 rounded-md font-semibold hover:bg-gray-200 transition"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="bg-gray-100 text-red-600 px-3 py-1 rounded-md font-semibold hover:bg-gray-200 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Right: Contact Icon (Desktop & Tablet) */}
        {/* <div className="hidden md:flex items-center justify-center bg-blue-500/10 border border-white/20 rounded-xl p-2 hover:bg-white/20 transition cursor-pointer">
          <MessageCircle className="text-white" size={20} />
        </div> */}

        {/* Mobile Menu Button */}
        {/* <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button> */}
      </div>
      

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-20 right-4 w-[90%] bg-black/70 backdrop-blur-lg border border-white/20 rounded-xl p-4 flex flex-col space-y-4 text-white font-semibold md:hidden">
          <Link
            href="/"
            className="text-red-600"
            onClick={() => setIsOpen(false)}
          >
            HOME
          </Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>
            ABOUT US
          </Link>
          <Link href="/services" onClick={() => setIsOpen(false)}>
            SERVICES
          </Link>
          <Link href="/contact" onClick={() => setIsOpen(false)}>
            CONTACT
          </Link>

          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="bg-white text-blue-700 px-3 py-1 rounded-md text-center"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="bg-white text-blue-700 px-3 py-1 rounded-md text-center"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}

          {/* Contact Icon in Mobile */}
          <div className="flex justify-center pt-2">
            <div className="flex items-center justify-center bg-white/10 border border-white/20 rounded-xl p-2 hover:bg-white/20 transition cursor-pointer">
              <MessageCircle className="text-white" size={20} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
