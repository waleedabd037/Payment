export default function Method3QR({ qr }: any) {
  return (
    <div className="section">
      <div className="sectionTitle">Method 3</div>
      <div className="qrTitle">Use Mobile Scan code to pay</div>

      {qr ? (
        <img src={qr} className="qr" />
      ) : (
        <p>Loading QR...</p>
      )}
    </div>
  );
}
