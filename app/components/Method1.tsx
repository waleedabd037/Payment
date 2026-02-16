import PayRow from "./PayRow";

export default function Method1({ amount, upiId }: any) {

  const merchantName = "Merchant";
  const orderId = "ORD" + Date.now();

  const upiLink = `upi://pay?pa=${upiId}&pn=${merchantName}&am=${amount}&cu=INR&tn=${orderId}`;

  return (
    <div className="section">
      <div className="sectionTitle">Method 1</div>

      <PayRow
        title="Paytm"
        logo="/paytm.png"
        appUrl={upiLink}
        webUrl={upiLink}
      />

      <PayRow
        title="PhonePe"
        logo="/phonepe.jpg"
        appUrl={upiLink}
        webUrl={upiLink}
      />

      <PayRow
        title="UPI"
        logo="/upi.jpg"
        appUrl={upiLink}
        webUrl={upiLink}
      />
    </div>
  );
}
