"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "./payment.css";

import Timer from "./components/Timer";
import PriceSection from "./components/PriceSection";
import Method1 from "./components/Method1";
import Method2Manual from "./components/Method2Manual";
import Method3QR from "./components/Method3QR";
import Warnings from "./components/Warnings";

export default function PaymentClient() {
  const searchParams = useSearchParams();

  const [qr, setQr] = useState("");
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 👈 Always start at 15 mins
  const [utr, setUtr] = useState("");
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");

  // 🔐 SECURE PARAMS FROM SIGNED LINK
  const amount = searchParams.get("amount") || "";
  const upiId = searchParams.get("upiId") || "";
  const expires = searchParams.get("expires") || "";
  const sig = searchParams.get("sig") || "";

  // ⏳ FAKE 15-MINUTE TIMER (Visual Only)
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 🔒 Verify + Generate QR from backend
  useEffect(() => {
    if (!amount || !upiId || !expires || !sig) {
      setError("Invalid payment link.");
      return;
    }

    const fetchQR = async () => {
      try {
        const res = await fetch("/api/generate-qr", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount,
            upiId,
            expires,
            sig,
          }),
        });

        if (!res.ok) {
          setError("Payment link expired or tampered.");
          return;
        }

        const data = await res.json();
        setQr(data.qr);
      } catch {
        setError("Something went wrong.");
      }
    };

    fetchQR();
  }, [amount, upiId, expires, sig]);

  const handleManualSubmit = () => {
    setChecking(true);
  };

  if (error) {
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
        {error}
      </div>
    );
  }

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
        {/* ⏳ Always shows 15 min countdown */}
        <Timer timeLeft={timeLeft} />

        <PriceSection amount={Number(amount)} oldAmount={0} />

        <Method1 amount={Number(amount)} upiId={upiId} expires={expires} />

        <Method2Manual
          upiId={upiId}
          utr={utr}
          setUtr={setUtr}
          onSubmit={handleManualSubmit}
        />

        <Method3QR qr={qr} />
        <Warnings />
      </div>
    </div>
  );
}
