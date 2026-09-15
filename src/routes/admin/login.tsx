import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/site/Buttons";
import { Corners, Wordmark } from "@/components/site/ornaments";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Staff sign in — Lebanon Chef" },
      { name: "description", content: "Private sign in for Lebanon Chef reservation staff." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Staff sign in — Lebanon Chef" },
      { property: "og:description", content: "Private sign in for Lebanon Chef reservation staff." },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    setBusy(true);
    setError(null);

    const { error: authError } =
      mode === "in"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${window.location.origin}/admin/reservations` },
          });

    if (authError) {
      setError(authError.message);
      setBusy(false);
      return;
    }
    await supabase.rpc("claim_admin");
    navigate({ to: "/admin/reservations", replace: true });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-5">
      <div aria-hidden className="pointer-events-none fixed inset-0 bg-khatam opacity-[0.05]" />
      <div className="corner-frame gold-border relative w-full max-w-md bg-ink-2 p-9">
        <Corners />
        <div className="text-center">
          <Wordmark />
        </div>
        <h1 className="mt-6 text-center font-serif text-2xl text-ivory">Reservations desk</h1>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <label className="block">
            <span className="text-[0.7rem] uppercase tracking-[0.2em] text-sand-muted">Email</span>
            <input
              name="email"
              type="email"
              required
              className="input-line mt-2 w-full bg-transparent py-2 text-ivory"
            />
          </label>
          <label className="block">
            <span className="text-[0.7rem] uppercase tracking-[0.2em] text-sand-muted">Password</span>
            <input
              name="password"
              type="password"
              required
              minLength={6}
              className="input-line mt-2 w-full bg-transparent py-2 text-ivory"
            />
          </label>
          {error && <p className="text-sm font-light text-ivory-2">{error}</p>}
          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? "Please wait…" : mode === "in" ? "Sign in" : "Create account"}
          </Button>
        </form>
        <button
          type="button"
          onClick={() => {
            setMode(mode === "in" ? "up" : "in");
            setError(null);
          }}
          className="link-gold mx-auto mt-7 block text-xs uppercase tracking-[0.2em] text-ivory-2"
        >
          {mode === "in" ? "Create the first staff account" : "I already have an account"}
        </button>
      </div>
    </main>
  );
}
