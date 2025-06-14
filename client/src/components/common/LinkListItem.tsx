import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

interface LinkListItemProps {
  href: string;
  children?: React.ReactNode;
}

const LinkListItem: React.FC<LinkListItemProps> = ({ href, children }) => {
  const router = useRouter();

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    router.push(href);
  };

  return (
    <ListItem disablePadding>
      <NextLink href={href} passHref style={{ width: '100%', textDecoration: 'none', color: 'inherit' }}>
        <ListItemButton component="a" onClick={handleClick}>
          {children}
        </ListItemButton>
      </NextLink>
    </ListItem>
  );
};

export default LinkListItem;
