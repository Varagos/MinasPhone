import { useState } from 'react';
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
import { useRouter } from 'next/router';
import PriceFilter from './PriceFilter';

function valuetext(value: number) {
  return `${value}€`;
}

const Filter = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const router = useRouter();
  // console.log('paramsss', search);

  const [value, setValue] = useState<number[]>([0, 200]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleListItemClick = (event: any, index: number) => {
    setSelectedIndex(index);
  };

  const handleClear = () => {
    setSelectedIndex(null);
  };
  return (
    <div>
      <Box border={1} borderColor="grey.300" borderRadius="1%" p={4}>
        <Typography variant="h5" gutterBottom color="black">
          <strong>Φίλτρα</strong>
        </Typography>
        <hr />
        <PriceFilter />
        {/* {search && (
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
                // color: 'black',
                borderColor: 'black',
                backgroundColor: '#3A3845',
              },
            }}
            color="primary"
            onClick={handleClear}
            component={Link}
            to={pathname}
          >
            Απαλοιφή φίλτρων
          </Button>
        )}
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
