import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import HighlightOff from '@mui/icons-material/HighlightOff';
import Slider from '@mui/material/Slider';
import PriceFilter from './PriceFilter';
import { PriceOption } from './definitions';
import useUrl from '@/hooks/useUrl';

const priceFilters: PriceOption[] = [
  {
    value: 'option1',
    label: 'Εως 150 €',
    lower: 0,
    upper: 150,
  },
  {
    value: 'option2',
    label: '150 - 400 €',
    lower: 150,
    upper: 400,
  },
  {
    value: 'option3',
    label: '400 - 850 €',
    lower: 400,
    upper: 850,
  },
  {
    value: 'option4',
    label: 'Από 850 € και άνω',
    lower: 850,
    upper: 1500,
  },
];

const Filter = () => {
  const { asPath } = useRouter();
  const { clearFilters, filter } = useUrl(asPath);
  const [activeFilters, setActiveFilters] = useState<{
    price?: boolean;
  }>({});

  const handleClear = () => {
    // setActiveFilters({});
    clearFilters();
  };

  const activatePriceFilter = () => {
    setActiveFilters({ ...activeFilters, price: true });
  };
  return (
    <div>
      <Box border={1} borderColor="grey.300" borderRadius="1%" p={4}>
        <Typography variant="h5" gutterBottom color="black">
          <strong>Φίλτρα</strong>
        </Typography>

        {activeFilters?.price && (
          <Button
            variant="outlined"
            size="small"
            fullWidth
            sx={{
              textTransform: 'none',
              whiteSpace: 'nowrap',
              textAlign: 'center',
              my: 2,
              px: 1,
              color: 'white',
              backgroundColor: 'black',
              borderColor: 'black',
              '&:hover': {
                borderColor: 'black',
                backgroundColor: '#3A3845',
              },
            }}
            color="primary"
            onClick={handleClear}
          >
            Απαλοιφή φίλτρων
          </Button>
        )}
        <hr />
        <PriceFilter
          priceFilters={priceFilters}
          activate={activatePriceFilter}
        />
        {/* {}
        <Typography variant="h6" gutterBottom>
          <strong>Κατασκευαστής</strong>
        </Typography>
        <Divider />
        <List>
          <ListItem button selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
            <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem button selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
            <ListItemText primary="Drafts" />
          </ListItem>
        </List>
        <Divider />
        <List component="nav" aria-label="secondary mailbox folder">
          <ListItem button selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
            <ListItemText primary="Trash" />
          </ListItem>
          <ListItem button selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)}>
            <ListItemText primary="Spam" />
          </ListItem>
        </List>

        <Typography variant="body1" gutterBottom>
          Τιμή
        </Typography>
        <Divider />
        <Box>
          <Slider
            getAriaLabel={() => 'Value range'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            min={0}
            max={2000}
          />
        </Box> */}
        {/* <Typography variant="body2" onClick={handleClear} component={Link}>
          <HighlightOff fontSize="inherit" /> Clear all
        </Typography> */}
      </Box>
    </div>
  );
};

export default Filter;
