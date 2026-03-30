"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(prevState: any, formData: FormData) {
  const user = formData.get("username") as string;
  const pass = formData.get("password") as string;

  const validUser = process.env.ADMIN_USER || "admin";
  const validPass = process.env.ADMIN_PASSWORD || "admin123";

  if (user === validUser && pass === validPass) {
    // Next.js versions can have cookies() as sync or async. We await it to support Next.js 15+ 
    const cookieStore = await cookies();
    
    cookieStore.set("auth_session", "admin_authenticated_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
  } else {
    return {
      error: "Usuario o contraseña incorrectos.",
    };
  }

  redirect("/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_session");
  redirect("/admin/login");
}
