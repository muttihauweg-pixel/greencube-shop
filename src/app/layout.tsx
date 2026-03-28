import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HansHanf Shop - Premium Hanfstecklinge",
  description: "Premium Hanfstecklinge Shop mit 25 Sorten. Hochwertige Stecklinge direkt vom Züchter.",
  keywords: ["Hanfstecklinge", "Cannabis", "Stecklinge", "Hanf", "CBD"],
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
