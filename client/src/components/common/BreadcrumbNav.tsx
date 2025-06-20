import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Link as NavigationLink } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbNavProps = {
  items: BreadcrumbItem[];
  sx?: any;
};

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ items, sx }) => {
  const t = useTranslations('common');
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{ mb: 2, ...sx }}
    >
      <NextLink href="/" passHref legacyBehavior>
        <Link underline="hover" color="inherit">
          {t('HOME')}
        </Link>
      </NextLink>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return isLast ? (
          <Typography key={item.label} color="text.primary">
            {item.label}
          </Typography>
        ) : (
          <NextLink
            key={item.label}
            href={item.href || '#'}
            passHref
            legacyBehavior
          >
            <Link underline="hover" color="inherit">
              {item.label}
            </Link>
          </NextLink>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbNav;
