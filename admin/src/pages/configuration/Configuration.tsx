import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useTranslate, useLocaleState, useTheme, Title } from 'react-admin';

import { darkTheme, lightTheme } from '../../layout/themes';
import { LocaleEnum } from '../../i18n';

const Configuration = () => {
  const translate = useTranslate();
  const [locale, setLocale] = useLocaleState();
  const [theme, setTheme] = useTheme<any>();

  return (
    <Card>
      <Title title={translate('pos.configuration')} />
      <CardContent>
        <Box sx={{ width: '10em', display: 'inline-block' }}>{translate('pos.theme.name')}</Box>
        <Button
          variant="contained"
          sx={{ margin: '1em' }}
          color={theme?.palette?.mode === 'light' ? 'primary' : 'secondary'}
          onClick={() => setTheme(lightTheme)}
        >
          {translate('pos.theme.light')}
        </Button>
        <Button
          variant="contained"
          sx={{ margin: '1em' }}
          color={theme?.palette?.mode === 'dark' ? 'primary' : 'secondary'}
          onClick={() => setTheme(darkTheme)}
        >
          {translate('pos.theme.dark')}
        </Button>
      </CardContent>
      <CardContent>
        <Box sx={{ width: '10em', display: 'inline-block' }}>{translate('pos.language')}</Box>
        <Button
          variant="contained"
          sx={{ margin: '1em' }}
          color={locale === LocaleEnum.EN ? 'primary' : 'secondary'}
          onClick={() => setLocale(LocaleEnum.EN)}
        >
          en
        </Button>
        <Button
          variant="contained"
          sx={{ margin: '1em' }}
          color={locale === LocaleEnum.GR ? 'primary' : 'secondary'}
          onClick={() => setLocale(LocaleEnum.GR)}
        >
          gr
        </Button>
        <Button
          variant="contained"
          sx={{ margin: '1em' }}
          color={locale === LocaleEnum.GR ? 'primary' : 'secondary'}
          onClick={() => setLocale(LocaleEnum.AR)}
        >
          ar
        </Button>
      </CardContent>
    </Card>
  );
};

export default Configuration;
