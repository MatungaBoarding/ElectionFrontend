import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QrScanner from "react-qr-scanner";

const QRCodeReader = () => {
  const [scanResult, setScanResult] = useState(null);
  const navigate = useNavigate();

  const handleScan = (data) => {
    if (data) {
      setScanResult(data.text || data);
      navigate(`/ballot_info/${data.text || data}`);
    }
  };

  const handleError = (err) => {
    console.error("QR Scan Error:", err);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-xl font-semibold mb-4">SCAN QR CODE</h2>
      <QrScanner
        delay={300}
        onScan={handleScan}
        onError={handleError}
        constraints={{
            video: { facingMode: "environment" }
        }}
        style={{ width: "100%" }}
      />
      {scanResult && (
        <p className="mt-4 p-2 bg-gray-200 rounded-md text-center">
          Scanned Code: {scanResult}
        </p>
      )}
    </div>
  );
};

export default QRCodeReader;
