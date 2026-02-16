"use client";

export default function PayRow({ title, logo, appUrl, webUrl }: any) {

  const isMobileDevice = () => {
    const nav: any = navigator;

    if (nav.userAgentData?.mobile !== undefined) {
      return nav.userAgentData.mobile;
    }

    return /android|iphone|ipad|ipod/i.test(navigator.userAgent);
  };

  const handleClick = () => {

    // DESKTOP
    if (!isMobileDevice()) {
      window.open(webUrl, "_blank", "noopener,noreferrer");
      return;
    }

    // MOBILE
    let pageHidden = false;

    const visibilityHandler = () => {
      if (document.hidden) pageHidden = true;
    };

    document.addEventListener("visibilitychange", visibilityHandler);

    window.location.href = appUrl;

    setTimeout(() => {
      document.removeEventListener("visibilitychange", visibilityHandler);

      if (!pageHidden) {
        window.open(webUrl, "_blank", "noopener,noreferrer");
      }
    }, 1800);
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
