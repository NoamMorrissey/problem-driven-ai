import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Problem-Driven AI",
    template: "%s | Problem-Driven AI",
  },
  description:
    "A methodology for building AI products starting from the real problem",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  openGraph: {
    title: "Problem-Driven AI",
    description:
      "A methodology for building AI products starting from the real problem",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
