import Fab from '@mui/material/Fab';
import FilterListIcon from '@mui/icons-material/FilterList';

// Inside your ProductsLayout component
{
  /* Other components */
}
import React from 'react';
type FloatingActionButtonProps = {
  handleOpenFilters: () => void;
};

const FloatingActionButton = ({
  handleOpenFilters,
}: FloatingActionButtonProps) => {
  return (
    <Fab
      color="primary"
      aria-label="filter"
      sx={{
        position: 'fixed',
        bottom: (theme) => theme.spacing(2),
        right: (theme) => theme.spacing(2),
        display: { xs: 'flex', sm: 'none' }, // Show only on xs screens
      }}
      onClick={handleOpenFilters}
    >
      <FilterListIcon />
    </Fab>
  );
};

export default FloatingActionButton;
