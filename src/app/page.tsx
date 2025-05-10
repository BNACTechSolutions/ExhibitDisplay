"use client";

export default function Page() {
  return (
    <div className="bg-gray-50 min-h-screen font-display">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <div className="text-2xl font-bold text-purple-700">Aditi</div>
        <div className="space-x-6">
          <a href="#about" className="text-gray-700 hover:text-purple-600 transition">About</a>
          <a href="#contact" className="text-gray-700 hover:text-purple-600 transition">Contact</a>
        </div>
      </nav>

      {/* Hero Section with Exhibit Photo */}
      <div className="relative h-screen">
        {/* Exhibition image with overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://acmeticketing.com/wp-content/uploads/2024/04/museum-exhibit-design.jpg')", 
            backgroundPosition: "center"
          }}
        >
          {/* Dark overlay for better text visibility */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        {/* Content overlay */}
        <div className="relative h-full flex flex-col justify-between items-center text-white p-8">
          {/* Top content */}
          <div className="text-center pt-20">
            <h1 className="text-5xl font-bold mb-4">Welcome to Aditi</h1>
            <p className="text-xl mb-6">An AI Exhibit Display System</p>
          </div>
          
          {/* Bottom content with QR code message */}
          <div className="text-center pb-20 max-w-2xl">
            <h2 className="text-3xl font-semibold mb-6">Exhibit your Displays by the help of AI - QR code based</h2>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="bg-gray-100 py-16 px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">About Us</h2>
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
          At Aditi, we aim to provide exceptional service to our clients by integrating AI
          technology to handle digital exhibit displays and content. Our QR code-based system makes it easy for visitors to interact with your exhibits. Join us to experience the difference.
        </p>
      </div>

      {/* Contact Section */}
      <div id="contact" className="py-16 px-8 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Contact Us</h2>
        <div className="bg-gray-50 shadow-lg rounded-lg p-8 w-full max-w-md mx-auto">
          <p className="text-gray-700 mb-4">📞 Phone: +91 9040343815</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 py-4 text-center text-gray-400">
        <p>&copy; 2025 BNAC. All Rights Reserved.</p>
      </footer>
    </div>
  );
}