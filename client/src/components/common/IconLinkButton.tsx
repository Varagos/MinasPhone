import React from 'react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type IconLinkButtonProps = {
  href: string;
  underline?: 'none' | 'underline' | 'hover:underline';
  childrenStyle?: React.CSSProperties & { className?: string };
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'asChild'>;

const IconLinkButton = React.forwardRef<HTMLButtonElement, IconLinkButtonProps>(
  ({
    href,
    children,
    className,
    underline = 'none',
    childrenStyle,
    variant = 'ghost',
    size = 'icon',
    ...props
  }, ref) => {
    return (
      <Button
        asChild
        variant={variant}
        size={size}
        className={cn(
          'text-inherit hover:bg-transparent hover:text-inherit',
          {
            'underline': underline === 'underline',
            'hover:underline': underline === 'hover:underline',
          },
          className
        )}
        ref={ref}
        {...props}
      >
        <Link href={href}>
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                className: cn(
                  (child.props as any).className,
                  'h-4 w-4', // Default icon size, can be overridden by className on the icon
                  childrenStyle?.className
                ),
                style: { ...(child.props as any).style, ...childrenStyle },
              } as any);
            }
            return child;
          })}
        </Link>
      </Button>
    );
  }
);

IconLinkButton.displayName = 'IconLinkButton';

export { IconLinkButton };
export type { IconLinkButtonProps };
