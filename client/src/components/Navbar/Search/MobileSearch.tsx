'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Search as SearchIcon } from 'lucide-react';

type MobileSearchProps = {
  className?: string;
};

const MobileSearch = ({ className = '' }: MobileSearchProps) => {
  const t = useTranslations('navbar');
  
  return (
    <div className={`sm:hidden w-full bg-secondary ${className}`}>
      <div className="container mx-auto px-4 py-2">
        <div className="relative flex w-full items-center">
          <SearchIcon className="absolute left-3 h-5 w-5 text-white" />
          <input
            type="text"
            placeholder={t('SEARCH_PLACEHOLDER') || 'Search...'}
            className="h-10 w-full rounded-full bg-white/15 pl-10 pr-4 text-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Search"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default MobileSearch;
