"use client";

export default function PayRow({ title, logo, appUrl, webUrl }: any) {

  const handleClick = () => {
    const userAgent = navigator.userAgent || navigator.vendor;

    const isMobile = /android|iphone|ipad|ipod/i.test(userAgent);

    if (isMobile) {
      // Try opening app
      const timeout = setTimeout(() => {
        // If app doesn't open, fallback to website
        window.location.href = webUrl;
      }, 1500);

      window.location.href = appUrl;

      // If user switches app, timeout will naturally stop
      return;
    }

    // Desktop → always open website
    window.open(webUrl, "_blank");
  };

  return (
    <div
      className="payRow"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div className="payLeft">
        <img src={logo} className="payLogo" alt={title} />
        <div className="payTitle">{title}</div>
      </div>
    </div>
  );
}
