import { styled } from '@mui/system';

export const MainContainer = styled('main')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

export const ThickBottomBorder = styled('span')(({ theme }) => ({
  fontWeight: '900',
  borderBottom: `thick solid ${theme.palette.primary.dark}`,
}));
