import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NextLink from 'next/link';
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
      <Link underline="hover" color="inherit" href="/" component={NextLink}>
        {t('HOME')}
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return isLast ? (
          <Typography key={item.label} color="text.primary">
            {item.label}
          </Typography>
        ) : (
          <Link
            underline="hover"
            color="inherit"
            component={NextLink}
            href={item.href || '#'}
            key={item.label}
          >
            {item.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbNav;
