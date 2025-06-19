"use client";
import { useState, useEffect } from "react";
import { QrCode, Smartphone, Zap, Users, Star, ChevronDown, X } from "lucide-react";

export default function Page() {
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showPWAPrompt, setShowPWAPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // PWA install prompt handler
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPWAPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowPWAPrompt(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      setDeferredPrompt(null);
      setShowPWAPrompt(false);
    }
  };

  const handleQRScan = async () => {
    // Check if device supports camera
    if (navigator.mediaDevices && await navigator.mediaDevices.getUserMedia()) {
      setShowQRScanner(true);
    } else {
      alert('Camera not supported on this device');
    }
  };

  const features = [
    {
      icon: <QrCode className="w-8 h-8" />,
      title: "QR Code Integration",
      description: "Seamless exhibit access through QR code scanning"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI-Powered Content",
      description: "Intelligent content delivery based on visitor preferences"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Multi-Language Support",
      description: "Content available in multiple languages with audio support"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Optimized",
      description: "Perfect experience across all devices and platforms"
    }
  ];

  const testimonials = [
    {
      name: "Museum Director",
      text: "Aditi has transformed our visitor experience completely!",
      rating: 5
    },
    {
      name: "Gallery Owner", 
      text: "The AI-powered displays have increased engagement by 300%",
      rating: 5
    },
    {
      name: "Exhibition Curator",
      text: "Multi-language support has made our exhibits truly accessible",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* PWA Install Prompt */}
      {showPWAPrompt && (
        <div className="fixed top-4 left-4 right-4 z-50 bg-white rounded-lg shadow-xl border border-purple-200 p-4 animate-slide-down">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Install Aditi App</h3>
                <p className="text-sm text-gray-600">Get the best experience with our app</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleInstallPWA}
                className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
              >
                Install
              </button>
              <button
                onClick={() => setShowPWAPrompt(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Scan QR Code</h3>
              <button
                onClick={() => setShowQRScanner(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
              <div className="text-center">
                <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Camera view will appear here</p>
                <p className="text-sm text-gray-500 mt-2">
                  Point your camera at the QR code to scan
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-lg shadow-sm z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Aditi
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Features</a>
              <a href="#about" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">About</a>
              <a href="#contact" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Contact</a>
            </div>
            <button
              onClick={handleQRScan}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-medium"
            >
              Scan QR
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative text-center px-6 max-w-5xl mx-auto pt-20">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
              🚀 AI-Powered Exhibition System
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800 bg-clip-text text-transparent leading-tight">
            Welcome to
            <br />
            <span className="text-6xl md:text-8xl">Aditi</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your exhibitions with AI-powered displays, QR code integration, and seamless multilingual experiences
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleQRScan}
              className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <QrCode className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              <span>Scan QR Code</span>
            </button>
            <a
              href="#features"
              className="px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-full text-lg font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-purple-600" />
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how Aditi revolutionizes the exhibition experience with cutting-edge technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <div className="text-purple-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="py-20 px-6 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About Aditi
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At Aditi, we're revolutionizing the way people interact with exhibitions and displays. Our AI-powered platform seamlessly integrates QR code technology with multilingual content delivery, creating immersive experiences that engage visitors like never before.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Whether you're running a museum, gallery, or any exhibition space, Aditi provides the tools to make your content accessible, interactive, and memorable for every visitor.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">✨</div>
                  <div className="text-gray-600 font-medium">AI-Powered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">🚀</div>
                  <div className="text-gray-600 font-medium">Next-Gen Tech</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">🌍</div>
                  <div className="text-gray-600 font-medium">Global Ready</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-purple-400 to-blue-500 rounded-3xl flex items-center justify-center text-white">
                <div className="text-center">
                  <QrCode className="w-24 h-24 mx-auto mb-4 opacity-80" />
                  <p className="text-xl font-semibold">Scan to Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="py-20 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Exhibition?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get in touch with us to learn how Aditi can revolutionize your visitor experience
          </p>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8">
            <div className="text-2xl font-semibold mb-2">📞 +91 9040343815</div>
            <div className="text-lg opacity-90">Contact us for a demo</div>
          </div>
          
          <button
            onClick={handleQRScan}
            className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Try Aditi Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4 md:mb-0">
              Aditi
            </div>
            <div className="text-gray-400">
              &copy; 2025 BNAC. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        @keyframes slide-down {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}