// app/head.tsx
export default function Head() {
  return (
    <>
      {/* Page title and description */}
      <title>My Payment App</title>
      <meta name="description" content="Pay easily using UPI or other methods." />

      {/* Open Graph (for WhatsApp, Facebook, LinkedIn) */}
      <meta property="og:title" content="My Payment App" />
      <meta property="og:description" content="Pay easily using UPI or other methods." />
      <meta property="og:image" content="/upi.jpg" />
      <meta property="og:url" content="https://payment-pied-omega.vercel.app/" />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="My Payment App" />
      <meta name="twitter:description" content="Pay easily using UPI or other methods." />
      <meta name="twitter:image" content="/upi.jpg" />
    </>
  );
}
