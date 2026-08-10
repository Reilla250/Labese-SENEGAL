import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Admin Login | LABESE",
  description: "Secure admin login for LABESE dashboard.",
};

// Server component: redirect already-authenticated admins straight to /admin
export default async function LoginPage() {
  const authenticated = await isAuthenticated();
  if (authenticated) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream/40 px-4 py-12">
      <LoginForm />
    </div>
  );
}
