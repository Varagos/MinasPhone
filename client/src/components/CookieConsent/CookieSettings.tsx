'use client';
import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { showPreferencesModal } from '@/utils/cookieConsentHelpers';

interface CookieSettingsProps extends Omit<ButtonProps, 'onClick'> {
  label?: string;
}

/**
 * A button component that opens the cookie preferences modal when clicked
 */
const CookieSettings: React.FC<CookieSettingsProps> = ({
  label = 'Cookie Settings',
  ...buttonProps
}) => {
  const handleClick = () => {
    showPreferencesModal();
  };

  return (
    <Button onClick={handleClick} {...buttonProps}>
      {label}
    </Button>
  );
};

export default CookieSettings;
