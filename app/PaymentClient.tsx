"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "./payment.css";

import Timer from "./components/Timer";
import PriceSection from "./components/PriceSection";
import Method1 from "./components/Method1";
import Method2Manual from "./components/Method2Manual";
import Method3QR from "./components/Method3QR";

export default function PaymentClient() {
  const searchParams = useSearchParams();

  const [qr, setQr] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [utr, setUtr] = useState("");
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");

  // 🔐 SECURE PARAMS FROM SIGNED LINK
  const amount = searchParams.get("amount") || "";
  const upiId = searchParams.get("upiId") || "";
  const expires = searchParams.get("expires") || "";
  const sig = searchParams.get("sig") || "";

  // ⏳ Calculate remaining time from expiry timestamp
  useEffect(() => {
    if (!expires) return;

    const expiryTime = parseInt(expires);
    const updateTimer = () => {
      const now = Date.now();
      const remaining = Math.floor((expiryTime - now) / 1000);
      setTimeLeft(remaining > 0 ? remaining : 0);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [expires]);

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
      } catch (err) {
        setError("Something went wrong.");
      }
    };

    fetchQR();
  }, [amount, upiId, expires, sig]);

  const handleManualSubmit = () => {
    setChecking(true);
  };

  // ❌ If invalid or expired
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

  // ⏳ Expired
  if (timeLeft === 0 && expires) {
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
        Payment link expired.
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
        <Timer timeLeft={timeLeft} />

        <PriceSection amount={Number(amount)} oldAmount={0} />

        <Method1 amount={Number(amount)} upiId={upiId} />

        <Method2Manual
          upiId={upiId}
          utr={utr}
          setUtr={setUtr}
          onSubmit={handleManualSubmit}
        />

        <Method3QR qr={qr} />
      </div>
    </div>
  );
}
