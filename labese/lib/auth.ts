import crypto from "crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "labese_admin_session";
// Session expires after 5 minutes of inactivity.
// Each authenticated request slides the window.
const SESSION_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes
const SESSION_EXPIRY_SECONDS = 5 * 60; // 5 minutes in seconds

function getCredentials() {
  // Read variables, strip shell export markers if present in .env
  let email = process.env.ADMIN_EMAIL || "admin@labese.org";
  let password = process.env.ADMIN_PASSWORD || "strongPasswordHere";

  if (email.startsWith("export ")) {
    email = email.substring(7);
  }
  if (password.startsWith("export ")) {
    password = password.substring(7);
  }

  return { email, password };
}

export async function setAdminSession() {
  const { email, password } = getCredentials();
  const cookieStore = await cookies();

  const expiry = Date.now() + SESSION_EXPIRY_MS;
  const data = JSON.stringify({ email, expiry });
  const signature = crypto.createHmac("sha256", password).update(data).digest("hex");
  const token = Buffer.from(JSON.stringify({ data, signature })).toString("base64");

  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: true, // Always true for production
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_EXPIRY_SECONDS,
  });
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get(SESSION_COOKIE_NAME);
  if (!tokenCookie?.value) return false;

  try {
    const { data, signature } = JSON.parse(
      Buffer.from(tokenCookie.value, "base64").toString("utf-8")
    );
    const { password, email: expectedEmail } = getCredentials();

    const expectedSignature = crypto
      .createHmac("sha256", password)
      .update(data)
      .digest("hex");

    if (signature !== expectedSignature) return false;

    const { email, expiry } = JSON.parse(data);
    if (Date.now() > expiry) return false;
    if (email !== expectedEmail) return false;

    // Slide the 5-minute window on every active request
    await setAdminSession();

    return true;
  } catch (e) {
    return false;
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    maxAge: 0,
    path: "/",
  });
}
