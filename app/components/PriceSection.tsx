import { useState } from "react";

export default function PriceSection({ amount, oldAmount }: any) {
  const [copied, setCopied] = useState(false);

  const copyAmount = async () => {
    await navigator.clipboard.writeText(String(amount));
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <>
      <div className="priceRow">
        <div className="price">₹ {amount}</div>

        <button className="copyBtn" onClick={copyAmount}>
          <img src="/copy.png" className="copyIcon" />
        </button>

        {copied && <span className="copied">Copied</span>}
      </div>

      <div className="oldPrice">₹ {oldAmount}</div>
      <div className="subtitle">The amount you need to pay</div>
    </>
  );
}
