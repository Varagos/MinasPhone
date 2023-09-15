import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import { CheckoutToken } from '@/types/checkout-token';

type ReviewProps = {
  checkoutToken: CheckoutToken;
};

const Review = ({ checkoutToken }: ReviewProps) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Ανακεφαλαίωση παραγγελίας
      </Typography>
      <List disablePadding>
        {checkoutToken.line_items.map((product) => (
          <ListItem style={{ padding: '10px 0' }} key={product.name}>
            <ListItemText
              primary={product.name}
              secondary={`Ποσότητα: ${product.quantity}`}
            />
            <Typography variant="body2">
              {product.subtotal.formatted_with_symbol}
            </Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 4, px: 0 }}>
          <ListItemText primary="Σύνολο" />
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            {checkoutToken.live.subtotal.formatted_with_symbol}
          </Typography>
        </ListItem>
      </List>
    </>
  );
};

export default Review;
