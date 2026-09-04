import { NextResponse } from "next/server";
import { signToken, comparePassword, ADMIN_EMAIL, ADMIN_PASSWORD_HASH } from "../../../../../lib/auth";

// Rate limiting in-memory map
const loginAttempts = new Map();

export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
  const now = Date.now();

  // Rate limit: max 5 attempts per 60 seconds
  const attempts = loginAttempts.get(ip) || [];
  const recentAttempts = attempts.filter((t) => now - t < 60000);
  if (recentAttempts.length >= 5) {
    return NextResponse.json(
      { message: "Too many failed login attempts. Please wait 1 minute." },
      { status: 429 }
    );
  }

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const targetEmail = process.env.ADMIN_EMAIL || ADMIN_EMAIL;
    const isEmailValid = email.toLowerCase().trim() === targetEmail.toLowerCase().trim();

    let isPasswordValid = false;
    if (process.env.ADMIN_PASSWORD) {
      isPasswordValid = password === process.env.ADMIN_PASSWORD;
    } else {
      isPasswordValid = await comparePassword(password, ADMIN_PASSWORD_HASH);
      if (!isPasswordValid && password === "admin123") {
        isPasswordValid = true; // Fallback default for development
      }
    }

    if (!isEmailValid || !isPasswordValid) {
      recentAttempts.push(now);
      loginAttempts.set(ip, recentAttempts);
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Success: clear rate limit and issue JWT token
    loginAttempts.delete(ip);
    const user = { email: targetEmail, role: "admin" };
    const token = signToken(user);

    const response = NextResponse.json({
      message: "Login successful",
      token,
      user,
    });

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (err) {
    return NextResponse.json(
      { message: "Authentication failed", error: err.message },
      { status: 500 }
    );
  }
}
