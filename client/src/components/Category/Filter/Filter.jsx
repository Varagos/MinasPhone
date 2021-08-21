import { useState } from "react";
import { Box, Divider, Typography, List, ListItem, ListItemText, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import HighlightOff from "@material-ui/icons/HighlightOff";

const Filter = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleClear = () => {
    setSelectedIndex(null);
  };
  return (
    <div>
      <Box border={1} borderColor='grey.300' borderRadius='1%' p={4}>
        <Typography variant='h6' gutterBottom>
          <strong>Κατασκευαστής</strong>
        </Typography>
        <Divider />
        <List>
          <ListItem
            button
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemText primary='Inbox' />
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemText primary='Drafts' />
          </ListItem>
        </List>
        <Divider />
        <List component='nav' aria-label='secondary mailbox folder'>
          <ListItem
            button
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemText primary='Trash' />
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 3)}
          >
            <ListItemText primary='Spam' />
          </ListItem>
        </List>
        <Typography variant='body2' onClick={handleClear} component={Link}>
          <HighlightOff fontSize='inherit' /> Clear all
        </Typography>
      </Box>
    </div>
  );
};

export default Filter;
