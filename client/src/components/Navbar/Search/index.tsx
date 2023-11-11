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
    >
      <SearchIcon />
    </IconButton>
  );
};

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
  display: 'none', // Hide by default
  justifyContent: 'center',
  [theme.breakpoints.up('md')]: {
    display: 'flex', // Show only on md screens and up when active
  },
}));

const SearchInputField = () => {
  return (
    <Search>
      <InputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        autoFocus
      />
    </Search>
  );
};

export { SearchInputField, SearchPromptIcon };
