export default function PayRow({ title, logo, appUrl, webUrl }: any) {

  const handlePay = () => {
    window.open(webUrl, "_blank");
    window.location.href = appUrl;
  };

  return (
    <div className="payRow">
      <div className="payLeft">
        <img src={logo} className="payLogo" />
        <div>
          <div className="payTitle">{title}</div>
          <div className="paySub">Convenient and fastest</div>
        </div>
      </div>

      <button className="payBtn" onClick={handlePay}>
        PAY
      </button>
    </div>
  );
}
