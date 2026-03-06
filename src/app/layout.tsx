import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Problem-Driven AI",
  description:
    "A methodology for building AI products starting from the real problem",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
