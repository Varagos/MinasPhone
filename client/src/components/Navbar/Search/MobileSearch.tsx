import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { alpha } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'next-i18next';
import AppBar from '@mui/material/AppBar';

const SearchPromptIcon = () => {
  return (
    <IconButton color="inherit" aria-label="search">
      <SearchIcon />
    </IconButton>
  );
};

const SearchDiv = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const MobileSearch = () => {
  const { t } = useTranslation();
  return (
    <AppBar
      position="static"
      color="secondary"
      sx={{ display: { xs: 'flex', sm: 'none' } }}
    >
      <Toolbar>
        <SearchDiv>
          <SearchPromptIcon />
          <StyledInputBase
            placeholder={t('NAVBAR.SEARCH_PLACEHOLDER')}
            inputProps={{ 'aria-label': 'search' }}
            autoFocus
          />
        </SearchDiv>
      </Toolbar>
    </AppBar>
  );
};

export default MobileSearch;
