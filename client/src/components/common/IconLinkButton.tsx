import React from 'react';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import NextLink from 'next/link';

type CustomIconButtonProps = {
  href: string;
  underline?: string;
  childrenStyle?: React.CSSProperties;
} & IconButtonProps;

const IconLinkButton: React.FC<CustomIconButtonProps> = ({
  href,
  children,
  underline = 'none',
  childrenStyle,
  ...props
}) => {
  const linkStyle = { textDecoration: underline, color: 'inherit' };

  return (
    <NextLink href={href} passHref>
      <IconButton style={linkStyle} {...props}>
        {/* {children} */}
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              style: { ...(child.props as any).style, ...childrenStyle },
            } as any);
          }
          return child;
        })}
      </IconButton>
    </NextLink>
  );
};

export default IconLinkButton;
