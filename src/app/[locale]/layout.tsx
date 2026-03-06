import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/layout/navbar";
import { UmamiAnalytics } from "@/components/layout/analytics";
import "@/../styles/globals.css";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
        </NextIntlClientProvider>
        <UmamiAnalytics />
      </body>
    </html>
  );
}
