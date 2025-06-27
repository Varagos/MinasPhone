'use client';
import React, { useTransition } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const languages: Record<string, { label: string; flag: string }> = {
  el: { label: 'Ελληνικά', flag: '/flags/gr.webp' },
  en: { label: 'English', flag: '/flags/us.webp' },
  // ar: { label: 'ar', flag: '/flags/eg.webp' },
  // Add other languages here
};

const LanguageSelector = () => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const pathname = usePathname();
  const params = useParams();

  const locale = useLocale();

  const handleChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: newLocale }
      );
    });
  };

  // Make sure the language is one of our supported languages
  const safeLanguage = Object.keys(languages).includes(locale) ? locale : 'el';

  return (
    <Select value={safeLanguage} onValueChange={handleChange}>
      <SelectTrigger className="w-auto border-0 shadow-none pr-2">
        <div className="flex items-center">
          <Image
            src={languages[safeLanguage].flag}
            alt=""
            width={21}
            height={16}
            className="mr-2 h-4 w-6 object-cover"
          />
          <SelectValue>{languages[safeLanguage].label}</SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent>
        {Object.entries(languages).map(([lang, { label, flag }]) => (
          <SelectItem key={lang} value={lang}>
            <div className="flex items-center">
              <Image
                src={flag}
                alt=""
                width={21}
                height={16}
                className="mr-2 h-4 w-5 object-cover"
              />
              {label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
