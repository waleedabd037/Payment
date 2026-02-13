import QRCode from "qrcode";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { amount, orderId } = await req.json();

    const upiId = "mdiltifat-3@oksbi";
    const storeName = "DemoStore";

    const upiLink = `upi://pay?pa=${upiId}&pn=${storeName}&am=${amount}&cu=INR&tn=${orderId}`;

    const qrImage = await QRCode.toDataURL(upiLink);

    return NextResponse.json({
      success: true,
      qr: qrImage,
    });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
