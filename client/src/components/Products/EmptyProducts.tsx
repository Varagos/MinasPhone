import Box from '@mui/material/Box';
import Image from 'next/image';
import Typography from '@mui/material/Typography';

import EmptyLogo from '../../../public/undraw_empty_xct9.svg';
import { useTranslations } from 'next-intl';

export function EmptyProducts() {
  const t = useTranslations('common');
  return (
    <main>
      <Box ml={4} py={6}>
        <Typography
          variant="h5"
          style={{ display: 'inline-block', verticalAlign: 'top' }}
        >
          {t('CATEGORY_IS_EMPTY')}
        </Typography>
        <Typography>{t('TRY_ANOTHER_PRODUCT')}</Typography>
      </Box>
      <Image
        src={EmptyLogo}
        style={{ width: '50%', height: 'auto' }}
        alt="Empty products"
      />
    </main>
  );
}
