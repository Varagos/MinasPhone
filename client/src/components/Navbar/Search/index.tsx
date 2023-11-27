import React from 'react';
import { alpha } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
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
