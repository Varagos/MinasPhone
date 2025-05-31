import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const languages: Record<string, { label: string; flag: string }> = {
  el: { label: 'el', flag: '/flags/gr.webp' },
  en: { label: 'en', flag: '/flags/us.webp' },
  // ar: { label: 'ar', flag: '/flags/eg.webp' },
  // Add other languages here
};

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const router = useRouter();

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newLocale = event.target.value;
    i18n.changeLanguage(newLocale);

    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, router.asPath, { locale: newLocale });
  };
  console.log(i18n.language);

  return (
    <Select
      value={i18n.language}
      onChange={handleChange}
      renderValue={(value) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src={languages[value].flag}
            alt=""
            width={21}
            height={16}
            style={{ marginRight: 5, width: 24 }}
          />
          {languages[value].label}
        </div>
      )}
    >
      {Object.entries(languages).map(([lang, { label, flag }]) => (
        <MenuItem key={lang} value={lang}>
          <Image
            src={flag}
            alt=""
            width={21}
            height={16}
            style={{ marginRight: 5, width: 24 }}
          />
          {label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default LanguageSelector;
