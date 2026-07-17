"use client";

import { useState, FormEvent } from "react";
import { siteConfig } from "@/config/site.config";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Couldn't send the message");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="border-t-4 border-primary bg-surface p-10 text-center md:p-16">
        <h3 className="font-heading text-2xl text-ink">Message sent!</h3>
        <p className="mt-3 font-body text-ink-soft">
          Thanks for reaching out. We'll get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 border-t-4 border-primary bg-surface p-8 md:p-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Field label="Full name" name="name" type="text" required />
        <Field label="Email" name="email" type="email" required />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="border-b border-border pb-2">
          <label className="mb-2 block font-body text-xs uppercase tracking-widest text-ink-soft">
            Project type
          </label>
          <select
            name="projectType"
            className="w-full border-none bg-transparent p-0 font-body text-ink focus:outline-none focus:ring-0"
          >
            {siteConfig.contact.projectTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>
        <Field label="Area / location" name="location" type="text" />
      </div>

      <div className="border-b border-border pb-2">
        <label className="mb-2 block font-body text-xs uppercase tracking-widest text-ink-soft">
          Tell us about your project
        </label>
        <textarea
          name="message"
          required
          rows={4}
          className="w-full resize-none border-none bg-transparent p-0 font-body text-ink placeholder:text-ink-soft/50 focus:outline-none focus:ring-0"
          placeholder="Briefly describe what you need..."
        />
      </div>

      {status === "error" && <p className="font-body text-sm text-red-600">{errorMsg}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-primary py-5 font-body text-sm font-semibold uppercase tracking-widest text-background transition-transform hover:scale-[1.01] disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div className="border-b border-border pb-2">
      <label className="mb-2 block font-body text-xs uppercase tracking-widest text-ink-soft">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full border-none bg-transparent p-0 font-body text-ink placeholder:text-ink-soft/50 focus:outline-none focus:ring-0"
      />
    </div>
  );
}
