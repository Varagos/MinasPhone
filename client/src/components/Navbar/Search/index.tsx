'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { Search as SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

type SearchPromptIconProps = {
  handleSearchToggle: () => void;
};

const SearchPromptIcon = ({ handleSearchToggle }: SearchPromptIconProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleSearchToggle}
      className="hidden md:flex"
      aria-label="Open search"
    >
      <SearchIcon className="h-5 w-5 text-white" />
    </Button>
  );
};

type SearchInputFieldProps = {
  className?: string;
};

const SearchInputField = ({ className = '' }: SearchInputFieldProps) => {
  const t = useTranslations('navbar');

  return (
    <div className={`relative flex items-center ${className}`}>
      <input
        type="text"
        placeholder={t('SEARCH_PLACEHOLDER') || 'Search...'}
        className="h-10 w-full rounded-full bg-secondary/10 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        aria-label="Search"
        autoFocus
      />
      <button
        type="button"
        className="absolute right-2 rounded-full p-1.5 text-muted-foreground hover:bg-secondary/20"
        aria-label="Search"
      >
        <SearchIcon className="h-4 w-4" />
      </button>
    </div>
  );
};

export { SearchInputField, SearchPromptIcon };
