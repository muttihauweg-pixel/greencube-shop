import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HansHanf - Premium Hanfstecklinge Shop",
  description: "HansHanf bietet 25+ Premium Hanfstecklinge Sorten. Hochwertige Genetik, diskreter Versand Österreich & Deutschland. Jetzt bestellen!",
  keywords: ["Hanfstecklinge", "Cannabis Stecklinge", "Hanf Stecklinge", "CBD Stecklinge", "HansHanf", "Premium Genetik", "Österreich", "Deutschland"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
