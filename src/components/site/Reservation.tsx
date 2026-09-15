import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Corners, GoldRule, StarMark } from "./ornaments";
import { Reveal } from "./Reveal";
import { Button } from "./Buttons";
import { CONTACT } from "./About";

const HOURS = [
  { days: "Monday – Thursday", time: "11:00 am – 11:00 pm" },
  { days: "Friday – Saturday", time: "11:00 am – 12:00 am" },
  { days: "Sunday", time: "12:00 pm – 11:00 pm" },
];

const PARTY_SIZES = ["2", "3", "4", "5–8", "9+"];

type Status = "idle" | "saving" | "done" | "error";

type Booking = { name: string; party: string; date: string; time: string };

export function Reservation() {
  const [status, setStatus] = useState<Status>("idle");
  const [booking, setBooking] = useState<Booking | null>(null);
  const [invalid, setInvalid] = useState<string[]>([]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "saving") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();

    const payload = {
      name: value("name").slice(0, 120),
      email: value("email").slice(0, 200),
      phone: value("phone").slice(0, 40),
      date: value("date"),
      time: value("time"),
      party_size: value("party_size"),
      note: value("note").slice(0, 1000) || null,
    };

    const missing = (["name", "email", "phone", "date", "time", "party_size"] as const).filter(
      (key) => !payload[key],
    );
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(payload.email)) missing.push("email");
    if (missing.length) {
      setInvalid(missing);
      return;
    }
    setInvalid([]);
    setStatus("saving");

    const { error } = await supabase.from("reservations").insert(payload);
    if (error) {
      setStatus("error");
      return;
    }
    setBooking({
      name: payload.name,
      party: payload.party_size,
      date: payload.date,
      time: payload.time,
    });
    setStatus("done");
    form.reset();
  }

  return (
    <section id="reservation" className="relative overflow-hidden bg-ivory py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-arabesque opacity-[0.05]" />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <h2 className="text-4xl leading-[1.05] text-ink sm:text-5xl">Book your table</h2>
          <GoldRule className="mt-5" />
          <p className="mt-6 max-w-md text-base font-light leading-relaxed text-ink/70">
            Reserve a place at our table and we will hold it for you. Every booking is confirmed
            personally by our team, by phone or email.
          </p>

          <dl className="mt-10 max-w-sm">
            {HOURS.map((row) => (
              <div
                key={row.days}
                className="flex items-baseline justify-between gap-6 border-b border-ink/10 py-4"
              >
                <dt className="font-serif text-lg text-ink">{row.days}</dt>
                <dd className="text-sm font-light tracking-wide text-ink/65">{row.time}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 text-sm font-light text-ink/60">
            For parties larger than twelve, please call{" "}
            <a className="link-gold text-ink" href={CONTACT.phoneHref}>
              {CONTACT.phone}
            </a>
            .
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="corner-frame gold-border relative bg-ink p-7 sm:p-10">
            <Corners />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-khatam opacity-[0.06]" />

            {status === "done" && booking ? (
              <div className="relative flex min-h-[26rem] flex-col items-center justify-center text-center">
                <svg viewBox="0 0 64 64" className="h-16 w-16" aria-hidden>
                  <circle cx="32" cy="32" r="29" fill="none" stroke="url(#okGold)" strokeWidth="1" />
                  <path
                    d="M19 33.5 L28.5 43 L45 23"
                    fill="none"
                    stroke="url(#okGold)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength={1}
                    strokeDasharray={1}
                    className="animate-check"
                  />
                  <defs>
                    <linearGradient id="okGold" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#8B6B2E" />
                      <stop offset="0.5" stopColor="#C9A44C" />
                      <stop offset="1" stopColor="#F0D998" />
                    </linearGradient>
                  </defs>
                </svg>
                <p className="mt-8 font-serif text-2xl leading-snug text-ivory">
                  Thanks {booking.name} — your table for {booking.party} on {booking.date} at{" "}
                  {booking.time} is requested.
                </p>
                <p className="mt-4 text-sm font-light text-sand">
                  We&apos;ll confirm by phone or email.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="link-gold mt-8 text-xs uppercase tracking-[0.2em] text-ivory-2"
                >
                  Make another booking
                </button>
              </div>
            ) : (
              <form className="relative" onSubmit={onSubmit} noValidate>
                <div className="flex items-center gap-3">
                  <StarMark />
                  <p className="font-serif text-2xl text-ivory">An invitation to our table</p>
                </div>

                <div className="mt-8 grid gap-7 sm:grid-cols-2">
                  <Field label="Full name" name="name" invalid={invalid.includes("name")} />
                  <Field label="Email" name="email" type="email" invalid={invalid.includes("email")} />
                  <Field label="Phone" name="phone" type="tel" invalid={invalid.includes("phone")} />
                  <Field label="Date" name="date" type="date" invalid={invalid.includes("date")} />
                  <Field label="Time" name="time" type="time" invalid={invalid.includes("time")} />
                  <label className="block">
                    <span className="text-[0.7rem] uppercase tracking-[0.2em] text-sand-muted">
                      Party size
                    </span>
                    <select
                      name="party_size"
                      defaultValue="2"
                      className="input-line mt-2 w-full appearance-none bg-transparent py-2 text-ivory"
                    >
                      {PARTY_SIZES.map((size) => (
                        <option key={size} value={size} className="bg-ink text-ivory">
                          {size} guests
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="mt-7 block">
                  <span className="text-[0.7rem] uppercase tracking-[0.2em] text-sand-muted">
                    Note (optional)
                  </span>
                  <textarea
                    name="note"
                    rows={2}
                    maxLength={1000}
                    className="input-line mt-2 w-full resize-none bg-transparent py-2 text-ivory"
                  />
                </label>

                {invalid.length > 0 && (
                  <p className="mt-6 text-sm font-light text-oxblood-hover">
                    Please complete every required field with valid details.
                  </p>
                )}
                {status === "error" && (
                  <p className="mt-6 text-sm font-light text-ivory-2">
                    Something went wrong — please call us at{" "}
                    <a className="link-gold" href={CONTACT.phoneHref}>
                      {CONTACT.phone}
                    </a>{" "}
                    or try again.
                  </p>
                )}

                <Button type="submit" className="mt-9 w-full" disabled={status === "saving"}>
                  {status === "saving" ? "Sending request…" : "Request a table"}
                </Button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  invalid,
}: {
  label: string;
  name: string;
  type?: string;
  invalid?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[0.7rem] uppercase tracking-[0.2em] text-sand-muted">{label}</span>
      <input
        name={name}
        type={type}
        aria-invalid={invalid || undefined}
        className="input-line mt-2 w-full bg-transparent py-2 text-ivory placeholder:text-sand-muted/60"
      />
    </label>
  );
}
