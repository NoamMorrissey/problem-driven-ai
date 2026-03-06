"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils/cn";

interface WorkshopRegistrationFormProps {
  workshopId: string;
  className?: string;
}

const i18n = {
  en: {
    firstName: "First name",
    lastName: "Last name",
    email: "Email address",
    submit: "Register",
    loading: "Registering...",
    success: "You're registered! We'll send you the details by email.",
    error: "Something went wrong. Please try again.",
    alreadyRegistered: "You're already registered for this workshop.",
  },
  es: {
    firstName: "Nombre",
    lastName: "Apellidos",
    email: "Email",
    submit: "Inscribirme",
    loading: "Inscribiendo...",
    success:
      "¡Te has inscrito! Te enviaremos los detalles por email.",
    error: "Algo salió mal. Inténtalo de nuevo.",
    alreadyRegistered: "Ya estás inscrito en este workshop.",
  },
};

export function WorkshopRegistrationForm({
  workshopId,
  className,
}: WorkshopRegistrationFormProps) {
  const locale = useLocale();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const t = i18n[locale as "en" | "es"] || i18n.en;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch(`/api/workshops/${workshopId}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          locale,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        if (data.code === "ALREADY_REGISTERED") {
          setStatus("success");
          setErrorMessage(t.alreadyRegistered);
          return;
        }
        throw new Error(data.error || "Request failed");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : t.error);
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
          {errorMessage || t.success}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            {t.firstName}
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            minLength={2}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            {t.lastName}
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            minLength={2}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          {t.email}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">{errorMessage || t.error}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-md bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "loading" ? t.loading : t.submit}
      </button>
    </form>
  );
}
