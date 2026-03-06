"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils/cn";

interface LeadCaptureFormProps {
  source: "ebook" | "workshop";
  sourceDetail?: string;
  className?: string;
}

export function LeadCaptureForm({
  source,
  sourceDetail,
  className,
}: LeadCaptureFormProps) {
  const locale = useLocale();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const t = {
    en: {
      name: "Full name",
      email: "Email address",
      company: "Company (optional)",
      submit: source === "ebook" ? "Get the e-book" : "Register",
      loading: "Sending...",
      success:
        source === "ebook"
          ? "Check your email! The e-book is on its way."
          : "Registration successful! We'll be in touch.",
      error: "Something went wrong. Please try again.",
    },
    es: {
      name: "Nombre completo",
      email: "Email",
      company: "Empresa (opcional)",
      submit:
        source === "ebook" ? "Obtener el e-book" : "Inscribirme",
      loading: "Enviando...",
      success:
        source === "ebook"
          ? "¡Revisa tu email! El e-book está en camino."
          : "¡Inscripción completada! Te contactaremos pronto.",
      error: "Algo salió mal. Inténtalo de nuevo.",
    },
  };

  const labels = t[locale as "en" | "es"] || t.en;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.get("fullName"),
          email: formData.get("email"),
          company: formData.get("company") || undefined,
          source,
          sourceDetail,
          locale,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Request failed");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : labels.error
      );
    }
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "rounded-lg border border-green-200 bg-green-50 p-6 text-center",
          className
        )}
      >
        <p className="text-lg font-medium text-green-800">
          {labels.success}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("space-y-4", className)}
    >
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-medium text-gray-700"
        >
          {labels.name}
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          required
          minLength={2}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          {labels.email}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
      </div>

      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium text-gray-700"
        >
          {labels.company}
        </label>
        <input
          type="text"
          id="company"
          name="company"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">{errorMessage || labels.error}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-md bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "loading" ? labels.loading : labels.submit}
      </button>
    </form>
  );
}
