import crypto from "crypto";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

function verifyJWT(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const token = cookie
    .split("; ")
    .find(c => c.startsWith("admin_token="))
    ?.split("=")[1];

  if (!token) return false;

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return true;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  if (!verifyJWT(req)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { amount, upiId } = await req.json();

  const expires = Date.now() + 2 * 60 * 60 * 1000;

  const data = `${amount}|${upiId}|${expires}`;

  const signature = crypto
    .createHmac("sha256", process.env.PAYMENT_SECRET!)
    .update(data)
    .digest("hex");

  const url = `https://payment-pied-omega.vercel.app/?amount=${amount}&upiId=${upiId}&expires=${expires}&sig=${signature}`;

  return NextResponse.json({ url });
}
