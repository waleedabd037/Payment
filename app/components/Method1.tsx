import PayRow from "./PayRow";

export default function Method1({ amount, upiId }: any) {
  const merchantName = "Merchant";
  const orderId = "ORD" + Date.now();

  const upiLink = `upi://pay?pa=${upiId}&pn=${merchantName}&am=${amount}&cu=INR&tn=${orderId}`;

  // Detect mobile
  const isMobile =
    typeof window !== "undefined" &&
    /android|iphone|ipad|ipod/i.test(navigator.userAgent);

  return (
    <div className="section">
      <div className="sectionTitle">Method 1</div>

      <PayRow
        title="Paytm"
        logo="/paytm.png"
        appUrl={upiLink}
        webUrl={isMobile ? upiLink : "https://paytm.com/"}
      />

      <PayRow
        title="PhonePe"
        logo="/phonepe.jpg"
        appUrl={upiLink}
        webUrl={isMobile ? upiLink : "https://www.phonepe.com/"}
      />

      <PayRow
        title="UPI"
        logo="/upi.jpg"
        appUrl={upiLink}
        webUrl={isMobile ? upiLink : "https://www.npci.org.in/what-we-do/upi/product-overview"}
      />
    </div>
  );
}
