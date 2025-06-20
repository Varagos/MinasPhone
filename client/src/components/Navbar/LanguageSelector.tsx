'use client';
import React, { useTransition } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { usePathname, useRouter } from '@/i18n/navigation';

// Regular components
import { useLocale, Locale } from 'next-intl';
import { useParams } from 'next/navigation';

const languages: Record<string, { label: string; flag: string }> = {
  el: { label: 'Greek', flag: '/flags/gr.webp' },
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

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newLocale = event.target.value;

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
    <Select
      value={safeLanguage}
      onChange={handleChange}
      renderValue={(value) => {
        // Ensure we have a valid language key
        const lang = Object.keys(languages).includes(value) ? value : 'el';
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Image
              src={languages[lang].flag}
              alt=""
              width={21}
              height={16}
              style={{ marginRight: 5, width: 24 }}
            />
            {languages[lang].label}
          </div>
        );
      }}
    >
      {Object.entries(languages).map(([lang, { label, flag }]) => (
        <MenuItem key={lang} value={lang}>
          <Image
            src={flag}
            alt=""
            width={21}
            height={16}
            style={{ marginRight: 5 }}
          />
          {label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default LanguageSelector;
