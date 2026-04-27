import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const t = useTranslations('Home');
  const pathname = usePathname();
  const router = useRouter();

  const changeLocale = (locale: string) => {
    // Assuming middleware will add prefix, we just change the pathname
    const base = pathname.split('/').slice(2).join('/'); // remove locale and first empty
    const newPath = `/${locale}/${base}`;
    router.push(newPath);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <section className="w-full max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold">{t.title}</h1>
        <p className="text-lg">{t.subtitle}</p>
        <div className="flex space-x-4">
          <Link href="/de/products" className="flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
            {t.nav.products}
          </Link>
          <Link href="/de/cart" className="flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
            {t.nav.cart}
          </Link>
        </div>
      </section>

      <footer className="w-full text-center py-6 text-sm text-muted-foreground">
        {t.footer.rights} |{' '}
        <Link href="/de/privacy">{t.footer.privacy}</Link>{' '} |{' '}
        <Link href="/de/terms">{t.footer.terms}</Link>
      </footer>

      <div className="fixed bottom-4 right-4 space-x-2">
        {[['de', 'Deutsch'], ['en', 'English'], ['es', 'Español']].map(([code, label]) => (
          <Button
            key={code}
            variant={pathname.startsWith(`/${code}/`) || pathname === `/${code}` ? 'destructive' : 'default'}
            size="icon"
            onClick={() => changeLocale(code)}
            aria-label={`Switch to ${label}`}
          >
            {label.toUpperCase()}
          </Button>
        ))}
      </div>
    </main>
  );
}