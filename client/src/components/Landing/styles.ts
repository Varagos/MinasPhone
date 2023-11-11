import { styled } from '@mui/material/styles';

export const MainContainer = styled('main')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

export const SectionTitle = styled('span')(({ theme }) => ({
  fontWeight: '900',
  borderBottom: `thick solid ${theme.palette.primary.dark}`,
  //'thick solid #6A2C70',
  paddingBottom: '3px',
  marginBottom: '40px',
}));
