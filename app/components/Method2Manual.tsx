"use client";

export default function Method2Manual({ upiId, utr, setUtr, onSubmit }: any) {
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

        <button
          className="payBtn"
          onClick={onSubmit}
          disabled={!utr}
        >
          SUBMIT
        </button>
      </div>

      <div className="utrWrapper">
  
  <input
    className="utrInput"
    placeholder="e.g. 123456789012"
    value={utr}
    onChange={(e) => setUtr(e.target.value)}
  />
</div>

    </div>
  );
}
