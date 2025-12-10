import arcjet, {
  detectBot,
  tokenBucket,
  shield,
  sensitiveInfo,
} from "@arcjet/next";
import { NextResponse } from "next/server";

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    // 1. BOT PROTECTION
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"], // Allow Google, Bing, etc.
    }),
    // 2. RATE LIMITING
    tokenBucket({
      mode: "LIVE",
      characteristics: ["userId"], // In a real app, use the authenticated user ID
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
    // 3. SHIELD WAF
    shield({
      mode: "LIVE", // Changed to LIVE to actively block attacks
    }),
    // 4. SENSITIVE INFORMATION (Applied typically to POST bodies)
    sensitiveInfo({
      mode: "LIVE",
      deny: ["EMAIL"], // Block emails in content (example configuration)
    }),
  ],
});

export async function GET(req: Request) {
  // Mock User ID for rate limiting
  const userId = "user123";

  const decision = await aj.protect(req, { userId, requested: 1 });

  console.log("Arcjet decision", decision);

  if (decision.isDenied()) {
    if (decision.reason.isBot()) {
      return NextResponse.json({ error: "No bots allowed" }, { status: 403 });
    }
    if (decision.reason.isRateLimit()) {
      return NextResponse.json({ error: "Too Many Requests" }, { status: 429 });
    }
    if (decision.reason.isShield()) {
      return NextResponse.json(
        { error: "Suspicious activity detected" },
        { status: 403 }
      );
    }
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({
    message: "Hello world - You passed Bot, Rate Limit, and Shield checks!",
  });
}

export async function POST(req: Request) {
  // This handler checks for Sensitive Information in the request body
  // We must provide 'userId' because tokenBucket rule requires it
  const decision = await aj.protect(req, { userId: "user123", requested: 1 });

  if (decision.isDenied()) {
    if (decision.reason.isSensitiveInfo()) {
      return NextResponse.json(
        { error: "Sensitive information detected in payload" },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const message = await req.text();
  return NextResponse.json({ message: `Received safe content: ${message}` });
}
