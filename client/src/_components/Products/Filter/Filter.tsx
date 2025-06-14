import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PriceFilter from './PriceFilter';
import useUrl from '@/hooks/useUrl';
import { priceFilters } from './contants';
import { usePathname } from 'next/navigation';

const Filter = () => {
  const pathName = usePathname();
  const { clearFilters, filter } = useUrl(pathName);
  const [activeFilters, setActiveFilters] = useState<{
    price?: boolean;
  }>({});

  useEffect(() => {
    if (filter && Object.keys(filter).length > 0) {
      setActiveFilters({ price: true });
    }
  }, [filter]);

  const handleClear = () => {
    // setActiveFilters({});
    clearFilters();
  };

  const activatePriceFilter = () => {
    setActiveFilters({ ...activeFilters, price: true });
  };

  /**
   * TODO reset pagination when filters change/ are applied
   * ~This is standard behavior, adopted by Amazon, eBay, etc.
   * Since the page (e.g.3 ) might not exist after applying filters
   * 
   *  Best Practices:
  - Scroll to Top – After resetting to page 1, auto-scroll the user to the top of the product list for a seamless experience.I
  - Preserve Filters in URL – Update the URL (e.g., ?category=hats&page=1) so the state is shareable and bookmarkable.
  - Loading State – Show a spinner/skeleton loader while the new results fetch.

  Example
  function handleFilterChange(newFilters) {
  // Reset to page 1 when filters change
  setFilters(newFilters);
  setCurrentPage(1); 
  fetchResults(newFilters, 1); // Reload data
  window.scrollTo(0, 0); // Scroll to top
}
   */
  return (
    <div>
      <Box border={1} borderColor="grey.300" borderRadius="1%" p={4}>
        <Typography variant="h5" gutterBottom color="black" component="h3">
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
          priceFilters={priceFilters.options}
          activate={activatePriceFilter}
          minMaxPrice={priceFilters.minMax}
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

       
        {/* <Typography variant="body2" onClick={handleClear} component={Link}>
          <HighlightOff fontSize="inherit" /> Clear all
        </Typography> */}
      </Box>
    </div>
  );
};

export default Filter;
