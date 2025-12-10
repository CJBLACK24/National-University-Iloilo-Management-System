import arcjet, { protectSignup } from "@arcjet/next";
import { NextResponse } from "next/server";

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    protectSignup({
      email: {
        mode: "LIVE",
        // Block emails that are disposable, invalid, or have no MX records
        block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
      },
      bots: {
        mode: "LIVE",
        allow: [], // Block all bots from signup
      },
      rateLimit: {
        // Sliding window rate limit for signups
        mode: "LIVE",
        interval: "10m",
        max: 5,
      },
    }),
  ],
});

export async function POST(req: Request) {
  const data = await req.json();
  const email = data.email;

  const decision = await aj.protect(req, {
    email,
  });

  console.log("Arcjet Signup Decision: ", decision);

  if (decision.isDenied()) {
    if (decision.reason.isEmail()) {
      return NextResponse.json(
        { message: "Invalid email address", reason: decision.reason },
        { status: 400 }
      );
    } else if (decision.reason.isBot()) {
      return NextResponse.json(
        { message: "Bots not allowed" },
        { status: 403 }
      );
    } else if (decision.reason.isRateLimit()) {
      return NextResponse.json(
        { message: "Too many attempts" },
        { status: 429 }
      );
    } else {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
  }

  return NextResponse.json({
    message: "Signup check passed",
  });
}
