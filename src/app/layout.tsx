import { NextIntlClientProvider } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
 
  // Extract locale from pathname (e.g. /en/products => en)
  const pathnameParts = pathname.split('/');
  const localeFromPath = pathnameParts[1] ?? 'de';
  const allowedLocales = ['de', 'en', 'es'] as const;
  const locale = allowedLocales.includes(localeFromPath as any)
    ? (localeFromPath as typeof allowedLocales[number])
    : 'de';
 
  // Adjust html lang attribute
  return (
    <NextIntlClientProvider locale={locale}>
      <html lang={locale} suppressHydrationWarning>
        <body className="antialiased bg-background text-foreground">
          {children}
        </body>
      </html>
    </NextIntlClientProvider>
  );
}