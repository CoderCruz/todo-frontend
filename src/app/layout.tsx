import type { Metadata } from "next";
import "./globals.css";
import Nav from '@components/Nav'

export const metadata: Metadata = {
  title: "Todo",
  description: "Take home assessment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="min-h-dvh bg-neutral-900 text-neutral-100 antialiased"
      >
        <Nav />
        <main className="mx-auto max-w-4xl p-4 pt-6">{children}</main>
      </body>
    </html>
  );
}
