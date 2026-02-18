import crypto from "crypto";
import { NextResponse } from "next/server";

function verifySignature(amount: string, upiId: string, expires: string, sig: string) {
  if (Date.now() > Number(expires)) return false;

  const data = `${amount}|${upiId}|${expires}`;

  const expectedSig = crypto
    .createHmac("sha256", process.env.PAYMENT_SECRET!)
    .update(data)
    .digest("hex");

  return expectedSig === sig;
}

export async function POST(req: Request) {
  const { amount, upiId, expires, sig } = await req.json();

  if (!verifySignature(amount, upiId, expires, sig)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const orderId = "ORD" + Date.now();
  const merchantName = "Merchant";

  const upiLink = `upi://pay?pa=${upiId}&pn=${merchantName}&am=${amount}&cu=INR&tn=${orderId}`;

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiLink)}`;

  return NextResponse.json({ qr: qrUrl });
}
