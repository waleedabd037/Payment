"use client";

export default function Method2Manual({ upiId, utr, setUtr, onSubmit }: any) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      alert("UPI ID copied to clipboard");
    } catch (err) {
      alert("Failed to copy UPI ID");
    }
  };

  return (
    <div className="section">
      <div className="sectionTitle">Method 2</div>

      <div className="payRow">
        <div className="payLeft">
          <img src="/upi.jpg" className="payLogo" />
          <div>
            <div className="payTitle">Manual transfer</div>
            <div className="paySub">Copy UPI and fill in UTR</div>
           </div>
        </div>

        {/* 🔁 COPY BUTTON */}
        <button className="copyBtn" onClick={handleCopy}>
          <img src="/copy.png" alt="Copy" />
        </button>
      </div>

      {/* 🔽 CENTERED INPUT */}
      <div className="utrWrapper">
        <input
          className="utrInput"
          placeholder="Enter UTR after payment"
          value={utr}
          onChange={(e) => setUtr(e.target.value)}
        />

        {/* ✅ SUBMIT BUTTON MOVED HERE */}
        <button
          className="submitBtn"
          onClick={onSubmit}
         // disabled={!utr}
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
}
