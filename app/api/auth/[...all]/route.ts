import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { aj } from "@/app/api/arcjet/route";
import { NextResponse } from "next/server";

const handlers = toNextJsHandler(auth);

export const GET = handlers.GET;

export const POST = async (req: Request) => {
  const url = new URL(req.url);

  // Apply Arcjet protection specifically for Email Sign Up
  if (url.pathname.includes("/sign-up/email")) {
    try {
      const clone = req.clone();
      const body = await clone.json();

      if (body.email) {
        const decision = await aj.protect(req, {
          userId: body.email, // Rate limit per email address
          requested: 1, // Consumes 1 token
          email: body.email, // Validate this email
        });

        if (decision.isDenied()) {
          console.error("Arcjet denied signup:", decision.reason);
          if (decision.reason.isEmail()) {
            return NextResponse.json(
              {
                message: "Email doesn't exist or is invalid.",
                error: "Email Validation Error",
              },
              { status: 400 }
            );
          }
          if (decision.reason.isBot()) {
            return NextResponse.json(
              { message: "Bot detected.", error: "Bot Protection" },
              { status: 403 }
            );
          }
          if (decision.reason.isRateLimit()) {
            return NextResponse.json(
              {
                message: "Too many attempts. Please try again later.",
                error: "Rate Limit",
              },
              { status: 429 }
            );
          }

          return NextResponse.json(
            {
              message: "Access Forbidden. Please contact support.",
              error: "Arcjet Protection",
            },
            { status: 403 }
          );
        }
      }
    } catch (error) {
      console.log("Error processing Arcjet protection:", error);
      // Continue to auth handler if checking fails, or block?
      // Usually fail matching safe, but let's log and proceed or block if critical.
      // proceeding.
    }
  }

  return handlers.POST(req);
};
