import PayRow from "./PayRow";

export default function Method1({ amount, upiId }: any) {
  const merchantName = "Merchant";
  const orderId = "ORD" + Date.now();

  const upiLink = `upi://pay?pa=${upiId}&pn=${merchantName}&am=${amount}&cu=INR&tn=${orderId}`;

  // 👇 Detect mobile device
  const isMobile =
    typeof window !== "undefined" &&
    /android|iphone|ipad|ipod/i.test(navigator.userAgent);

  // 👇 Desktop should open website homepage instead of upi
  const websiteHome = "https://paytm.com/";

  const webUrl = isMobile ? upiLink : websiteHome;

  return (
    <div className="section">
      <div className="sectionTitle">Method 1</div>

      <PayRow
        title="Paytm"
        logo="/paytm.png"
        appUrl={upiLink}
        webUrl={webUrl}
      />

      <PayRow
        title="PhonePe"
        logo="/phonepe.jpg"
        appUrl={upiLink}
        webUrl={webUrl}
      />

      <PayRow
        title="UPI"
        logo="/upi.jpg"
        appUrl={upiLink}
        webUrl={webUrl}
      />
    </div>
  );
}
