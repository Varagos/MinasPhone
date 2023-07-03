import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

interface LinkListItemProps {
  href: string;
  children?: React.ReactNode;
}

const LinkListItem: React.FC<LinkListItemProps> = ({ href, children }) => {
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    router.push(href);
  };

  return (
    <NextLink href={href} passHref>
      <ListItem button component="a" onClick={handleClick}>
        {children}
      </ListItem>
    </NextLink>
  );
};

export default LinkListItem;
