"use client"
import { Metadata } from "next";
import { useState } from "react";
import dynamic from "next/dynamic";

import ExhibitCode from "@/components/ExhibitCode";

// Dynamically import the QR Code scanner
const QrReader = dynamic(() => import("react-qr-scanner"), { ssr: false });

export default function Page() {
  const [showScanner, setShowScanner] = useState(false);
  const [qrData, setQrData] = useState<string | null>(null);

  const handleScan = (data: any) => {
    if (data) {
      setQrData(data.text); // Save the scanned QR data
      setShowScanner(false); // Close scanner after reading QR
      alert(`Scanned QR Code Data: ${data.text}`); // Example action
    }
  };

  const handleError = (err: any) => {
    console.error("QR Scanner Error:", err);
  };

  return (
    <div className="bg-gray-100 h-screen font-display flex flex-col items-center justify-center px-4">
      {/* Header Section */}
      <div className="bg-white shadow-md rounded-lg p-6 text-center mb-8 max-w-lg w-full">
        <h1 className="text-xl font-semibold text-gray-800">
          Lets navigate you to your page!
        </h1>
      </div>

      {/* QR Scanner Button */}
      <button
        onClick={() => setShowScanner(!showScanner)}
        className="bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-purple-700 transition"
      >
        Open QR Code Scanner
      </button>

      {/* QR Scanner */}
      {showScanner && (
        <div className="mt-6 bg-white rounded-lg p-4 shadow-md max-w-md w-full">
          <h2 className="text-lg font-semibold text-center text-gray-800 mb-4">
            Scan your QR Code
          </h2>
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "100%" }}
          />
        </div>
      )}

      {/* Display QR Code Data */}
      {qrData && (
        <div className="mt-4 bg-green-100 text-green-700 p-4 rounded-lg shadow">
          <p>QR Data: {qrData}</p>
        </div>
      )}
    </div>
  );
}
