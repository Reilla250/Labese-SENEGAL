"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { contactSchema, contactReasons, type ContactFormValues } from "@/lib/contact-schema";
import { submitContactForm } from "@/app/actions/contact";

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [serverStatus, setServerStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      organisation: "",
      email: "",
      phone: "",
      reason: "",
      message: "",
      consent: false as unknown as true,
      website: "",
    },
  });

  const onSubmit = (values: ContactFormValues) => {
    setServerStatus("idle");
    setServerMessage(null);

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "consent") {
        if (value) formData.set("consent", "on");
      } else {
        formData.set(key, String(value ?? ""));
      }
    });

    startTransition(async () => {
      const result = await submitContactForm({ status: "idle" }, formData);
      if (result.status === "success") {
        setServerStatus("success");
        reset();
      } else {
        setServerStatus("error");
        setServerMessage(result.message ?? "Something went wrong. Please try again.");
      }
    });
  };

  if (serverStatus === "success") {
    return (
      <div
        role="status"
        className="rounded-xl border border-forest/30 bg-forest-light px-6 py-8 text-center"
      >
        <CheckCircle2 className="mx-auto text-forest" size={36} aria-hidden="true" />
        <p className="mt-4 text-navy font-semibold text-lg">Message sent</p>
        <p className="mt-2 text-sm text-ink/75 max-w-md mx-auto leading-relaxed">
          Thank you for contacting LABESE. We welcome questions, partnership
          proposals, programme enquiries and invitations to collaborate. We
          aim to respond as soon as possible while protecting confidentiality
          and personal information.
        </p>
        <button
          type="button"
          onClick={() => setServerStatus("idle")}
          className="mt-5 text-sm font-semibold text-forest underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  const busy = isSubmitting || isPending;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5"
      aria-describedby={serverStatus === "error" ? "contact-form-error" : undefined}
    >
      {/* Honeypot — hidden from visual/AT users, catches automated bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field blank</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      {serverStatus === "error" && serverMessage && (
        <p
          id="contact-form-error"
          role="alert"
          className="rounded-lg bg-red-50 border border-red-200 text-red-800 px-4 py-3 text-sm"
        >
          {serverMessage}
        </p>
      )}

      <Field label="Full name" htmlFor="fullName" error={errors.fullName?.message} required>
        <input
          id="fullName"
          type="text"
          autoComplete="name"
          className={inputClass(!!errors.fullName)}
          aria-invalid={!!errors.fullName}
          {...register("fullName")}
        />
      </Field>

      <Field label="Organisation" htmlFor="organisation" error={errors.organisation?.message}>
        <input
          id="organisation"
          type="text"
          autoComplete="organization"
          className={inputClass(!!errors.organisation)}
          {...register("organisation")}
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Email address" htmlFor="email" error={errors.email?.message} required>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={inputClass(!!errors.email)}
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </Field>

        <Field label="Telephone number" htmlFor="phone" error={errors.phone?.message}>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass(!!errors.phone)}
            {...register("phone")}
          />
        </Field>
      </div>

      <Field label="Reason for contacting LABESE" htmlFor="reason" error={errors.reason?.message} required>
        <select
          id="reason"
          className={inputClass(!!errors.reason)}
          aria-invalid={!!errors.reason}
          defaultValue=""
          {...register("reason")}
        >
          <option value="" disabled>
            Select a reason
          </option>
          {contactReasons.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message" htmlFor="message" error={errors.message?.message} required>
        <textarea
          id="message"
          rows={5}
          className={inputClass(!!errors.message)}
          aria-invalid={!!errors.message}
          {...register("message")}
        />
      </Field>

      <div>
        <label htmlFor="consent" className="flex items-start gap-3 text-sm text-ink/80">
          <input
            id="consent"
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-navy/30 text-forest focus-visible:outline-2"
            aria-invalid={!!errors.consent}
            {...register("consent")}
          />
          <span>
            I consent to LABESE contacting me about this enquiry.
            <span aria-hidden="true" className="text-forest-dark">
              {" "}
              *
            </span>
          </span>
        </label>
        {errors.consent?.message && (
          <p className="mt-1.5 text-sm text-red-700">{errors.consent.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={busy}
        className="inline-flex items-center gap-2 rounded-md bg-forest px-6 py-3 text-sm font-semibold text-white hover:bg-forest-dark disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {busy && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
        {busy ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-md border bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 focus-visible:outline-2 ${
    hasError ? "border-red-400" : "border-navy/20"
  }`;
}

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-navy mb-1.5">
        {label}
        {required && (
          <span aria-hidden="true" className="text-forest-dark">
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
