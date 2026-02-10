import PayRow from "./PayRow";

export default function Method1({ amount, upiId }: any) {
  return (
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
  );
}
