"use client";

import { useState } from "react";

export default function Method2Manual({ upiId, utr, setUtr, onSubmit }: any) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(String(upiId)); // copy actual UPI
    setCopied(true);
    setTimeout(() => setCopied(false), 1200); // show message for 1.2s
  };

  return (
    <div className="section">
      <div className="sectionTitle">Method 2</div>

      <div className="payRow">
        <div className="payLeft">
          <img src="/upi.jpg" className="payLogo" alt="UPI Logo" />
          <div>
            <div className="payTitle">Manual transfer</div>
            <div className="paySub">Copy UPI and fill in UTR</div>
          </div>
        </div>

        {/* 🔁 COPY BUTTON */}
        <button className="copyBtn" onClick={handleCopy}>
          <img src="/copy.png" alt="Copy" />
        </button>

        {/* ✅ Show copied message */}
        {copied && <span className="copied">UPI ID copied to clipboard</span>}
      </div>

      {/* 🔽 CENTERED INPUT */}
      <div className="utrWrapper">
        <input
          className="utrInput"
          placeholder="Enter UTR after payment"
          value={utr}
          onChange={(e) => setUtr(e.target.value)}
        />

        {/* ✅ SUBMIT BUTTON */}
        <button className="submitBtn" onClick={onSubmit} >
          SUBMIT
        </button>
      </div>
    </div>
  );
}
