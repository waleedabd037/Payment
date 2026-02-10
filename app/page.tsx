"use client";

import { useEffect, useState } from "react";
import "./payment.css";

export default function PaymentPage() {
  const [qr, setQr] = useState("");
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [copied, setCopied] = useState(false);
  const [utr, setUtr] = useState("");

  const amount = 899.99;
  const oldAmount = 999.99;
  const orderId = "ORD12345";
  const upiId = "merchant@upi";

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  /* ---------------- FETCH QR ---------------- */
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

  /* ---------------- COPY AMOUNT ---------------- */
  const copyAmount = async () => {
    await navigator.clipboard.writeText(String(amount));
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="page">
      <div className="card">

        <div className="timer">
          Order will be closed in: <b>{minutes}:{seconds}</b>
        </div>

        <div className="priceRow">
          <div className="price">₹ {amount}</div>

          <button className="copyBtn" onClick={copyAmount}>
            <img src="/copy.png" className="copyIcon" />
          </button>

          {copied && <span className="copied">Copied</span>}
        </div>

        <div className="oldPrice">₹ {oldAmount}</div>
        <div className="subtitle">The amount you need to pay</div>

        {/* ---------------- METHOD 1 ---------------- */}
        <div className="section">
          <div className="sectionTitle">Method 1</div>

          <PayRow
            title="Paytm"
            logo="/paytm.png"
            appUrl="paytmmp://pay"
            webUrl="https://paytm.com"
          />

          <PayRow
            title="PhonePe"
            logo="/phonepe.jpg"
            appUrl="phonepe://pay"
            webUrl="https://www.phonepe.com"
          />

          <PayRow
            title="UPI"
            logo="/upi.jpg"
            appUrl={`upi://pay?pa=${upiId}&pn=Merchant&am=${amount}&cu=INR`}
            webUrl="https://www.npci.org.in/what-we-do/upi/product-overview"
          />
        </div>

        {/* ---------------- METHOD 2 ---------------- */}
        <div className="section">
          <div className="sectionTitle">Method 2</div>
          <div className="qrTitle">Use Mobile Scan code to pay</div>

          {qr ? (
            <img src={qr} className="qr" />
          ) : (
            <p>Loading QR...</p>
          )}
        </div>

        {/* ---------------- METHOD 3 ---------------- */}
        <div className="section">
          <div className="sectionTitle">Method 3</div>

          <div className="payRow">
            <div className="payLeft">
              <img src="/upi.jpg" className="payLogo" />
              <div>
                <div className="payTitle">Manual transfer</div>
                <div className="paySub">Copy UPI and fill in UTR</div>
              </div>
            </div>

            <button
              className="payBtn"
              onClick={() => navigator.clipboard.writeText(upiId)}
            >
              PAY
            </button>
          </div>

          <input
            className="utrInput"
            placeholder="Enter UTR after payment"
            value={utr}
            onChange={(e) => setUtr(e.target.value)}
          />
        </div>

      </div>
    </div>
  );
}

/* ---------------- PAY ROW COMPONENT ---------------- */
function PayRow({ title, logo, appUrl, webUrl }: any) {
  const handlePay = () => {
  // Open web app immediately (user gesture)
  const webWindow = window.open(webUrl, "_blank", "noopener,noreferrer");

  // Then try opening the app
  window.location.href = appUrl;

  // Optional: close web tab if app opens (Android only, best-effort)
  setTimeout(() => {
    if (webWindow) {
      try {
        webWindow.focus();
      } catch {}
    }
  }, 500);
};

  return (
    <div className="payRow">
      <div className="payLeft">
        <img src={logo} className="payLogo" />
        <div>
          <div className="payTitle">{title}</div>
          <div className="paySub">Convenient and fastest</div>
        </div>
      </div>

      <button className="payBtn" onClick={handlePay}>
        PAY
      </button>
    </div>
  );
}
