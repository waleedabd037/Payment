// app/head.tsx
export default function Head() {
  return (
    <>
      {/* Page Title & Meta Description */}
      <title>UPI Payment App</title>
      <meta name="description" content="Pay easily using UPI or other methods. Secure, fast, and hassle-free payments." />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:title" content="UPI Payment App" />
      <meta property="og:description" content="Pay easily using UPI or other methods. Secure, fast, and hassle-free payments." />
      <meta property="og:image" content="/upi.jpg" />
      <meta property="og:image:alt" content="UPI Payment QR Code" />
      <meta property="og:url" content="https://payment-pied-omega.vercel.app/" />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="UPI Payment App" />
      <meta name="twitter:description" content="Pay easily using UPI or other methods. Secure, fast, and hassle-free payments." />
      <meta name="twitter:image" content="/upi.jpg" />
      <meta name="twitter:image:alt" content="UPI Payment QR Code" />
    </>
  );
}
