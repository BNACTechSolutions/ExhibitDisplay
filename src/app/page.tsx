"use client";
import { Metadata } from "next";

export default function Page() {
  return (
    <div className="bg-gray-50 h-screen font-display">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <div className="text-2xl font-bold text-purple-700">Aditi</div>
        <div className="space-x-6">
          {/* <a href="#features" className="text-gray-700 hover:text-purple-600 transition">Features</a> */}
          <a href="#about" className="text-gray-700 hover:text-purple-600 transition">About</a>
          <a href="#contact" className="text-gray-700 hover:text-purple-600 transition">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-400 text-white py-20 px-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Aditi</h1>
        <p className="text-lg mb-8">An AI Exhibit Display</p>
        {/* <button className="bg-white text-purple-600 font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition">
          Get Started
        </button> */}
      </div>

      {/* Features Section */}
      {/* <div id="features" className="py-16 px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <div className="text-purple-600 text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Platform</h3>
            <p className="text-gray-600">Experience top-notch security for your business transactions.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <div className="text-purple-600 text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Fast Processing</h3>
            <p className="text-gray-600">Get your tasks done quickly and efficiently.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <div className="text-purple-600 text-4xl mb-4">🌍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Global Reach</h3>
            <p className="text-gray-600">Connect with clients and partners worldwide.</p>
          </div>
        </div>
      </div> */}

      {/* About Section */}
      <div id="about" className="bg-gray-100 py-16 px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">About Us</h2>
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
          At Aditi, we aim to provide exceptional service to our clients by integrating ai
          technology to handle digital exhibit displays and content. Join us to experience the difference.
        </p>
      </div>

      {/* Contact Section */}
      <div id="contact" className="py-16 px-8 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Contact Us</h2>
        <div className="bg-gray-50 shadow-lg rounded-lg p-8 w-full max-w-md mx-auto">
          <p className="text-gray-700 mb-4">📧 Email: support@example.com</p>
          <p className="text-gray-700 mb-4">📞 Phone: +1 123-456-7890</p>
          <p className="text-gray-700">🏢 Address: 123 Main Street, City, Country</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 py-4 text-center text-gray-400">
        <p>&copy; 2025 BNAC. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
