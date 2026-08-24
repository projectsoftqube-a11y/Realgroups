"use client";

import { useState } from "react";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Record<string, string>): Errors {
  const errors: Errors = {};

  if (!values.name?.trim()) errors.name = "Please enter your name.";
  else if (values.name.trim().length < 2)
    errors.name = "Please enter at least 2 characters.";

  if (!values.email?.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(values.email.trim()))
    errors.email = "Please enter a valid email address.";

  if (values.message && values.message.length > 4000)
    errors.message = "Message is too long (4000 characters maximum).";

  return errors;
}

const base =
  "w-full rounded-lg border bg-white px-4 py-3.5 text-base font-medium text-neutral-900 outline-none transition-colors placeholder:font-normal placeholder:text-neutral-400";
const ok = "border-neutral-300 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/25";
const bad = "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/25";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm font-medium text-red-600">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<Errors>({});

  /** Clear a field's error as soon as the user starts correcting it. */
  function clearError(name: keyof Errors) {
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const values = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus({ kind: "idle" });
      // Move focus to the first field that failed.
      const first = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus({
          kind: "error",
          message: body.error ?? "Something went wrong. Please try again.",
        });
        return;
      }
      form.reset();
      setErrors({});
      setStatus({ kind: "sent" });
    } catch {
      setStatus({
        kind: "error",
        message: "Network error. Please check your connection and try again.",
      });
    }
  }

  return (
    /* noValidate so our own inline messages show instead of the browser's
       native validation bubbles. */
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot — hidden from humans, catches naive bots. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-semibold uppercase tracking-[0.1em] text-neutral-700"
        >
          Name <span className="text-brand-gold">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          onChange={() => clearError("name")}
          className={`${base} ${errors.name ? bad : ok}`}
        />
        <FieldError id="name-error" message={errors.name} />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-semibold uppercase tracking-[0.1em] text-neutral-700"
        >
          Email <span className="text-brand-gold">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          onChange={() => clearError("email")}
          className={`${base} ${errors.email ? bad : ok}`}
        />
        <FieldError id="email-error" message={errors.email} />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-semibold uppercase tracking-[0.1em] text-neutral-700"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Write your message here"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          onChange={() => clearError("message")}
          className={`${base} resize-y ${errors.message ? bad : ok}`}
        />
        <FieldError id="message-error" message={errors.message} />
      </div>

      <div>
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className="w-full cursor-pointer rounded-full bg-neutral-900 px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-brand-gold hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status.kind === "sending" ? "Sending…" : "Send message"}
        </button>

        <p aria-live="polite" className="mt-4 text-sm">
          {status.kind === "sent" && (
            <span className="font-medium text-green-700">
              Thanks — your message has been sent. We&apos;ll be in touch shortly.
            </span>
          )}
          {status.kind === "error" && (
            <span className="font-medium text-red-600">{status.message}</span>
          )}
        </p>
      </div>
    </form>
  );
}
