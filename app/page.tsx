"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "./payment.css";

import Timer from "./components/Timer";
import PriceSection from "./components/PriceSection";
import Method1 from "./components/Method1";
import Method2Manual from "./components/Method2Manual";
import Method3QR from "./components/Method3QR";

export default function PaymentPage() {

  const searchParams = useSearchParams();

  const [qr, setQr] = useState("");
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [utr, setUtr] = useState("");
  const [checking, setChecking] = useState(false);

  /* -------- GET DATA FROM URL -------- */
  const amount = Number(searchParams.get("amount")) || 0;
  const upiId = searchParams.get("upi") || "";
  const name = searchParams.get("name") || "Merchant";

  /* -------- OPTIONAL OLD PRICE AUTO CALC -------- */
  const oldAmount = amount ? amount + 1000 : 0;

  const orderId = "ORD" + Date.now();

  /* -------- TIMER -------- */
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((p) => (p <= 0 ? 0 : p - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  /* -------- GENERATE QR -------- */
  useEffect(() => {

    if (!amount || !upiId) return;

    const fetchQR = async () => {
      const res = await fetch("/api/generate-qr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          orderId,
          upiId,
          name
        }),
      });

      const data = await res.json();
      setQr(data.qr);
    };

    fetchQR();

  }, [amount, upiId]);

  /* -------- SUBMIT HANDLER -------- */
  const handleManualSubmit = () => {
    setChecking(true);
  };

  /* -------- FULL SCREEN CHECKING -------- */
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

        <Method1
          amount={amount}
          upiId={upiId}
        />

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
