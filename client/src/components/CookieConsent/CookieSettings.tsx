'use client';
import React from 'react';
import { showPreferencesModal } from '@/utils/cookieConsentHelpers';

interface CookieSettingsProps {
  label?: string;
  className?: string;
}

/**
 * A component that opens the cookie preferences modal when clicked
 * Styled to match NavigationLink in the footer
 */
const CookieSettings: React.FC<CookieSettingsProps> = ({
  label = 'Cookie Settings',
  className = ''
}) => {
  const handleClick = () => {
    showPreferencesModal();
  };

  return (
    <span 
      onClick={handleClick}
      className={`${className} inline-block cursor-pointer`}
    >
      {label}
    </span>
  );
};

export default CookieSettings;
