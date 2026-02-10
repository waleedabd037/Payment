// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UPI Payment App",
  description: "Pay easily using UPI or other methods. Secure, fast, and hassle-free payments.",

  openGraph: {
    title: "UPI Payment App",
    description: "Pay easily using UPI or other methods. Secure, fast, and hassle-free payments.",
    url: "https://payment-pied-omega.vercel.app/",
    siteName: "UPI Payment App",
    images: [
      {
        url: "/upi-preview.png",
        width: 1200,
        height: 630,
        alt: "UPI Payment QR Code",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "UPI Payment App",
    description: "Pay easily using UPI or other methods. Secure, fast, and hassle-free payments.",
    images: ["/upi-preview.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
