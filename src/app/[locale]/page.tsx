import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        Problem-Driven AI
      </h1>
      <p className="mt-6 max-w-2xl text-center text-lg text-gray-600">
        {t("description")}
      </p>
    </main>
  );
}
