// Server-only admin session helpers.
import { createHash } from "crypto";
import { useSession } from "@tanstack/react-start/server";

export interface AdminSessionData {
  admin?: boolean;
}

function sessionPassword(): string {
  const raw = process.env.ADMIN_SESSION_SECRET;
  if (!raw) throw new Error("ADMIN_SESSION_SECRET is not configured");
  // useSession requires >= 32 chars; derive a stable 64-char hex digest so any
  // user-provided value works.
  return createHash("sha256").update(raw).digest("hex");
}

export const ADMIN_SESSION_NAME = "bty_admin";

export function getAdminSession() {
  return useSession<AdminSessionData>({
    password: sessionPassword(),
    name: ADMIN_SESSION_NAME,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
    },
  });
}

export async function requireAdmin(): Promise<void> {
  const session = await getAdminSession();
  if (!session.data?.admin) {
    throw new Error("Unauthorized");
  }
}

export async function isAdmin(): Promise<boolean> {
  const session = await getAdminSession();
  return session.data?.admin === true;
}