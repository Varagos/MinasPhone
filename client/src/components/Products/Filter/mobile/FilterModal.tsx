import React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PriceFilter from '../PriceFilter';
import { priceFilters } from '../contants';
import Filter from '../Filter';
// import other necessary components

type FilterModalProps = {
  open: boolean;
  onClose: () => void;
};

const FilterModal: React.FC<FilterModalProps> = ({ open, onClose }) => {
  // Re-use the same logic and components as your desktop filter here

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      aria-labelledby="mobile-filter-dialog"
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Φίλτρα
          </Typography>
          {/* <Button autoFocus color="inherit" onClick={onClose}>
            Apply
          </Button> */}
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          p: 3,
          // Additional styling if needed
        }}
      >
        {/* Here you can add your filter components */}
        {/* Example: <PriceFilter ... /> */}
        <Filter />

        {/* <PriceFilter
          priceFilters={priceFilters.options}
          activate={() => {}}
          minMaxPrice={priceFilters.minMax}
        /> */}
      </Box>
    </Dialog>
  );
};

export default FilterModal;
