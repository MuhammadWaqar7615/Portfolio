import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_jwt_key_muhammad_waqar_portfolio_2026";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "mwaqar7615@gmail.com";
// Pre-hashed default password 'admin123' if not set in environment
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || "$2a$10$8.uXlD1D2S7B3n/L3V/Xue9Q8j8zXJ7Y.8.uXlD1D2S7B3n/L3V/X";

export async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

export function getAuthUser(request) {
  try {
    const authHeader = request.headers.get("authorization");
    let token = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    } else {
      // Check cookies
      const cookieHeader = request.headers.get("cookie");
      if (cookieHeader) {
        const cookies = Object.fromEntries(
          cookieHeader.split("; ").map((c) => {
            const [k, ...v] = c.split("=");
            return [k, v.join("=")];
          })
        );
        token = cookies["admin_token"];
      }
    }

    if (!token) return null;
    return verifyToken(token);
  } catch (err) {
    return null;
  }
}

export { ADMIN_EMAIL, ADMIN_PASSWORD_HASH };
