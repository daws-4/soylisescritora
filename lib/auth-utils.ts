// Esta es una implementación simulada de autenticación
// En un entorno real, se utilizaría un sistema de autenticación como NextAuth.js

import { cookies } from "next/headers"

export function isAuthenticated() {
  const cookieStore = cookies()
  return cookieStore.has("auth_session")
}

export function simulateLogin() {
  const cookieStore = cookies()
  cookieStore.set("auth_session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 semana
    path: "/",
  })
}

export function simulateLogout() {
  const cookieStore = cookies()
  cookieStore.delete("auth_session")
}
