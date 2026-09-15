import { useCallback, useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { GoldRule, Wordmark } from "@/components/site/ornaments";

type Reservation = Tables<"reservations">;
type Status = Reservation["status"];

const STATUSES: Status[] = ["pending", "confirmed", "cancelled"];

export const Route = createFileRoute("/admin/reservations")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Reservations — Lebanon Chef" },
      { name: "description", content: "Incoming table requests for Lebanon Chef, Colombo." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Reservations — Lebanon Chef" },
      { property: "og:description", content: "Incoming table requests for Lebanon Chef, Colombo." },
    ],
  }),
  component: AdminReservations,
});

function AdminReservations() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<Reservation[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data: session } = await supabase.auth.getUser();
    if (!session.user) {
      navigate({ to: "/admin/login", replace: true });
      return;
    }
    const { data, error: loadError } = await supabase
      .from("reservations")
      .select("*")
      .order("date", { ascending: true })
      .order("time", { ascending: true });
    if (loadError) {
      setError("You don't have access to reservations with this account.");
      setRows([]);
      return;
    }
    setRows(data ?? []);
  }, [navigate]);

  useEffect(() => {
    void load();
  }, [load]);

  async function updateStatus(id: string, status: Status) {
    setRows((current) => current?.map((row) => (row.id === id ? { ...row, status } : row)) ?? null);
    const { error: updateError } = await supabase
      .from("reservations")
      .update({ status })
      .eq("id", id);
    if (updateError) {
      setError("Could not update that booking — please refresh and try again.");
      void load();
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login", replace: true });
  }

  return (
    <main className="min-h-screen bg-ink px-5 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Wordmark compact />
            <h1 className="mt-3 font-serif text-3xl text-ivory">Reservations</h1>
            <GoldRule className="mt-4" />
          </div>
          <button
            type="button"
            onClick={signOut}
            className="link-gold text-xs uppercase tracking-[0.2em] text-ivory-2"
          >
            Sign out
          </button>
        </div>

        {error && <p className="mt-8 text-sm font-light text-ivory-2">{error}</p>}

        <div className="gold-border mt-10 overflow-x-auto bg-ink-2">
          <table className="w-full min-w-[56rem] text-left text-sm text-sand">
            <thead className="text-[0.7rem] uppercase tracking-[0.18em] text-sand-muted">
              <tr className="border-b border-gold/20">
                <Th>Date</Th>
                <Th>Time</Th>
                <Th>Name</Th>
                <Th>Contact</Th>
                <Th>Party</Th>
                <Th>Note</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {rows === null && (
                <tr>
                  <td className="px-4 py-8 font-light" colSpan={7}>
                    Loading bookings…
                  </td>
                </tr>
              )}
              {rows?.length === 0 && !error && (
                <tr>
                  <td className="px-4 py-8 font-light" colSpan={7}>
                    No reservations yet.
                  </td>
                </tr>
              )}
              {rows?.map((row) => (
                <tr key={row.id} className="border-b border-gold/10 align-top">
                  <Td>{row.date}</Td>
                  <Td>{row.time.slice(0, 5)}</Td>
                  <Td className="text-ivory">{row.name}</Td>
                  <Td>
                    <a className="link-gold block" href={`mailto:${row.email}`}>
                      {row.email}
                    </a>
                    <a className="link-gold block" href={`tel:${row.phone}`}>
                      {row.phone}
                    </a>
                  </Td>
                  <Td>{row.party_size}</Td>
                  <Td className="max-w-[16rem] whitespace-pre-wrap">{row.note ?? "—"}</Td>
                  <Td>
                    <select
                      value={row.status}
                      onChange={(event) => updateStatus(row.id, event.target.value as Status)}
                      className="input-line bg-transparent py-1 text-ivory"
                    >
                      {STATUSES.map((status) => (
                        <option key={status} value={status} className="bg-ink text-ivory">
                          {status}
                        </option>
                      ))}
                    </select>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-4 font-medium">{children}</th>;
}

function Td({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-4 font-light ${className ?? ""}`}>{children}</td>;
}
