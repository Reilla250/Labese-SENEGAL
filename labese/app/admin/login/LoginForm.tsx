"use client";

import { useActionState, startTransition, useEffect } from "react";
import { loginAction } from "@/app/actions/admin";
import { ShieldCheck, Loader2, AlertCircle } from "lucide-react";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, {
    status: "idle",
  });

  // Use full page redirect to ensure cookies are sent
  useEffect(() => {
    if (state.status === "success") {
      // Full page reload ensures cookies are included
      window.location.href = "/admin";
    }
  }, [state.status]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div className="w-full max-w-md">
      {/* Card */}
      <div className="rounded-2xl border border-line bg-white p-8 shadow-2xl shadow-navy/10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-forest-light flex items-center justify-center">
            <ShieldCheck size={28} className="text-forest-dark" />
          </div>
          <span className="font-mono-stat text-xs font-semibold uppercase tracking-[0.2em] text-forest">
            LABESE Administration
          </span>
          <h1 className="mt-2 font-display text-3xl font-bold text-navy leading-tight">
            Welcome back
          </h1>
          <p className="mt-1.5 text-sm text-ink/60 leading-relaxed">
            Sign in to manage content, upload media, and control the system.
          </p>
        </div>

        {/* Error Banner */}
        {state.status === "error" && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3.5 text-sm text-rose-700">
            <AlertCircle size={18} className="mt-0.5 shrink-0 text-rose-500" />
            <div>
              <p className="font-semibold">Authentication failed</p>
              <p className="mt-0.5 text-xs text-rose-600">{state.message}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="admin-email"
              className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1.5"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="admin-email"
              required
              autoComplete="email"
              disabled={isPending}
              className="block w-full rounded-xl border border-line bg-cream/30 px-4 py-3 text-sm text-navy placeholder-ink/35 focus:border-forest focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest/20 disabled:opacity-50 transition-all"
              placeholder="admin@labese.org"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="admin-password"
              className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1.5"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="admin-password"
              required
              autoComplete="current-password"
              disabled={isPending}
              className="block w-full rounded-xl border border-line bg-cream/30 px-4 py-3 text-sm text-navy placeholder-ink/35 focus:border-forest focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest/20 disabled:opacity-50 transition-all"
              placeholder="••••••••"
            />
          </div>

          {/* Session notice */}
          <p className="text-[11px] text-ink/45 text-center">
            Session expires after <strong>5 minutes</strong> of inactivity.
          </p>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-forest px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-forest/20 hover:bg-forest-dark transition-all hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Signing in…
              </>
            ) : (
              "Sign In to Dashboard"
            )}
          </button>
        </form>
      </div>

      {/* Back to site */}
      <p className="mt-5 text-center text-xs text-ink/40">
        <a href="/" className="hover:text-forest transition-colors">
          ← Return to LABESE website
        </a>
      </p>
    </div>
  );
}
