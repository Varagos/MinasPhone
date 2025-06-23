'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import EmptyLogo from '@/../public/undraw_empty_xct9.svg';
import { useTranslations } from 'next-intl';
import { Link as NavigationLink } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

// Custom 404 Page as a catch-all route inside locale context
export default function CatchAllNotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);
  const t = useTranslations('common');

  // Auto-redirect after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 10000);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, [router]);

  return (
    <div className="py-16">
      <div className="container mx-auto max-w-3xl">
        <div className="flex flex-col items-center justify-center min-h-[70vh] py-8 text-center">
          <h1 className="text-4xl font-bold text-primary mb-8">{'404'}</h1>

          <h2 className="text-2xl font-semibold mb-4">
            {'Ωχ! Χάσατε το δρόμο σας;'}
          </h2>

          <p className="mb-16 max-w-[600px] text-muted-foreground">
            {'Φαίνεται ότι ψάχνετε για ένα προϊόν που εξαφανίστηκε σαν τα' +
              ' ακουστικά που πάντα χάνονται στις τσέπες μας. Η σελίδα που' +
              ' αναζητάτε δεν υπάρχει ή μετακινήθηκε.'}
          </p>

          <div className="w-[280px] h-[280px] relative mb-16">
            <Image
              src={EmptyLogo}
              alt="Page not found"
              style={{ width: '100%', height: 'auto' }}
              priority
            />
          </div>

          <div className="flex flex-col items-center gap-4">
            <Button
              variant="default"
              size="lg"
              className="px-8 py-6 rounded-md font-semibold text-lg"
              asChild
            >
              <NavigationLink href="/">{t('BACK_TO_HOME')}</NavigationLink>
            </Button>

            <p className="text-sm text-muted-foreground">
              {'Αυτόματη ανακατεύθυνση σε'} {countdown} {'δευτερόλεπτα...'}
            </p>
          </div>

          <div className="mt-12">
            <p className="text-sm text-muted-foreground mb-4">
              {'Μήπως ψάχνετε για:'}
            </p>
            <div className="flex justify-center flex-wrap gap-4">
              <Button variant="outline" size="sm" asChild>
                <NavigationLink href="/products">
                  {t('ALL_PRODUCTS')}
                </NavigationLink>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <NavigationLink href="/categories">
                  {'Κατηγορίες'}
                </NavigationLink>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <NavigationLink href="/#contact">
                  {'Επικοινωνία'}
                </NavigationLink>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
