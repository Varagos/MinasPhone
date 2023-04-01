import React from 'react';
import { IconButton, IconButtonProps } from '@mui/material';
import NextLink from 'next/link';

type CustomIconButtonProps = {
  href: string;
} & IconButtonProps;

const IconLinkButton: React.FC<CustomIconButtonProps> = ({ href, children, ...props }) => {
  return (
    <NextLink href={href} passHref>
      <IconButton {...props}>{children}</IconButton>
    </NextLink>
  );
};

export default IconLinkButton;
