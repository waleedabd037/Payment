"use client";

import { useEffect, useState } from "react";
import "./payment.css";

import Timer from "./components/Timer";
import PriceSection from "./components/PriceSection";
import Method1 from "./components/Method1";
import Method2Manual from "./components/Method2Manual";
import Method3QR from "./components/Method3QR";

export default function PaymentPage() {
  const [qr, setQr] = useState("");
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [utr, setUtr] = useState("");
  const [checking, setChecking] = useState(false);

  const amount = 5427;
  const oldAmount = 6427;
  const orderId = "ORD12345";
  const upiId = "8097246401@dhani";

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((p) => (p <= 0 ? 0 : p - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchQR = async () => {
      const res = await fetch("/api/generate-qr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, orderId }),
      });

      const data = await res.json();
      setQr(data.qr);
    };

    fetchQR();
  }, []);

  /* ---------- SUBMIT HANDLER ---------- */
  const handleManualSubmit = () => {
    setChecking(true);

    // Later: call backend to verify UTR
    // fetch("/api/verify-utr", ...)
  };

  /* ---------- FULL SCREEN CHECKING ---------- */
  if (checking) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          fontWeight: 500,
        }}
      >
        Please wait, system checking…
      </div>
    );
  }

  return (
    <div className="page">
      <div className="card">

        <Timer timeLeft={timeLeft} />

        <PriceSection
          amount={amount}
          oldAmount={oldAmount}
        />

        <Method1 amount={amount} upiId={upiId} />

        {/* ✅ METHOD 2 = Manual */}
        <Method2Manual
          upiId={upiId}
          utr={utr}
          setUtr={setUtr}
          onSubmit={handleManualSubmit}
        />

        {/* ✅ METHOD 3 = QR */}
        <Method3QR qr={qr} />

      </div>
    </div>
  );
}
