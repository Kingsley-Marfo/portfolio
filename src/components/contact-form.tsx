"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const fieldBase =
  "w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-ring/40";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});
    setErrorMessage(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        return;
      }

      const json = await res.json().catch(() => ({}));
      if (json.errors) setErrors(json.errors);
      if (json.error) setErrorMessage(json.error);
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-10 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-success/10 text-success">
          <CheckCircle2 className="size-7" />
        </span>
        <div>
          <h3 className="text-lg font-semibold">Message sent</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Thanks for reaching out — I&apos;ll get back to you shortly.
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => setStatus("idle")}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-card p-6 sm:p-8"
      noValidate
    >
      {/* honeypot */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px]"
        aria-hidden
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name}>
          <input name="name" className={fieldBase} placeholder="Ada Lovelace" required />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            name="email"
            type="email"
            className={fieldBase}
            placeholder="you@company.com"
            required
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Subject" optional>
          <input
            name="subject"
            className={fieldBase}
            placeholder="Software Engineer opportunity"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Message" error={errors.message}>
          <textarea
            name="message"
            rows={5}
            className={cn(fieldBase, "resize-y")}
            placeholder="Tell me a little about the role or project…"
            required
          />
        </Field>
      </div>

      {status === "error" && !Object.keys(errors).length ? (
        <p className="mt-4 text-sm text-red-500">
          {errorMessage || (
            <>
              Something went wrong. Please email me directly at{" "}
              <a className="underline" href={siteConfig.socials.email}>
                {siteConfig.email}
              </a>
              .
            </>
          )}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        className="mt-6 w-full"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send className="size-4" /> Send message
          </>
        )}
      </Button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Prefer email? Reach me at{" "}
        <a className="underline hover:text-foreground" href={siteConfig.socials.email}>
          {siteConfig.email}
        </a>
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  optional,
  children,
}: {
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-2 text-sm font-medium">
        {label}
        {optional ? (
          <span className="text-xs font-normal text-muted-foreground">
            (optional)
          </span>
        ) : null}
      </span>
      {children}
      {error ? <span className="mt-1 block text-xs text-red-500">{error}</span> : null}
    </label>
  );
}
