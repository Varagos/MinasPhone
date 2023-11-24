import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
  InputBase,
  ClickAwayListener,
  alpha,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Phone from '@mui/icons-material/Phone';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

type SearchPromptIconProps = {
  handleSearchToggle: () => void;
};

const SearchPromptIcon = (props: SearchPromptIconProps) => {
  const { handleSearchToggle } = props;
  return (
    <IconButton
      color="inherit"
      aria-label="open search"
      onClick={handleSearchToggle}
      sx={(theme) => ({
        [theme.breakpoints.down('sm')]: {
          display: 'none', // Hide on small screens
        },
      })}
    >
      <SearchIcon />
    </IconButton>
  );
};

const SearchDiv = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 20,
  backgroundColor: theme.palette.secondary.main,
  //   alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  padding: '10px 30px',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
  display: 'none', // Hide by default
  justifyContent: 'center',
  // Flex self align to the left
  [theme.breakpoints.up('md')]: {
    display: 'flex', // Show only on md screens and up when active
  },
}));

const SearchInputField = () => {
  const { t } = useTranslation();
  return (
    <SearchDiv>
      <InputBase
        placeholder={t('NAVBAR.SEARCH_PLACEHOLDER')}
        inputProps={{ 'aria-label': 'search' }}
        autoFocus
      />
    </SearchDiv>
  );
};

export { SearchInputField, SearchPromptIcon };
