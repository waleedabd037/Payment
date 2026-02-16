"use client";

export default function PayRow({ title, logo, appUrl, webUrl }: any) {

  const handleClick = () => {
    // Try opening app first
    window.location.href = appUrl;

    // Fallback to web after 1 second
    setTimeout(() => {
      window.location.href = webUrl;
    }, 1000);
  };

  return (
    <div className="payRow" onClick={handleClick} style={{ cursor: "pointer" }}>
      <div className="payLeft">
        <img src={logo} className="payLogo" alt={title} />
        <div className="payTitle">{title}</div>
      </div>
    </div>
  );
}
