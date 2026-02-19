export default function Method3QR({ qr }: any) {
  return (
    <div className="section">
      <div className="sectionTitle">Method 3</div>
      <div className="qrTitle">Scan QR to Pay Securely</div>

      {qr ? (
        <div className="qrTile">
          <div className="qrBadge">Secure Payment</div>

          <div className="qrWrapper">
            <img src={qr} className="qr" alt="QR Code" />
          </div>

          <div className="qrFooter">
            Scan using any UPI app
          </div>
        </div>
      ) : (
        <p className="qrLoading">Loading QR...</p>
      )}
    </div>
  );
}
