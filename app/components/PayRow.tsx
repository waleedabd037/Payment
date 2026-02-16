"use client";

export default function PayRow({ title, logo, appUrl, webUrl }: any) {

const handleClick = () => {
  const isMobile = /android|iphone|ipad|ipod/i.test(navigator.userAgent);

  if (!isMobile) {
    window.open(webUrl, "_blank");
    return;
  }

  let pageHidden = false;

  const visibilityHandler = () => {
    if (document.hidden) {
      pageHidden = true; // app opened
    }
  };

  document.addEventListener("visibilitychange", visibilityHandler);

  // try opening app
  window.location.href = appUrl;

  // fallback check
  setTimeout(() => {
    document.removeEventListener("visibilitychange", visibilityHandler);

    if (!pageHidden) {
      window.open(webUrl, "_blank");
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
