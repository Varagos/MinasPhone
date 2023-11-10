import { styled } from '@mui/material/styles';

export const MainContainer = styled('main')(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3),
}));

export const ToolBar = styled('div')(({ theme }) => theme.mixins.toolbar);
