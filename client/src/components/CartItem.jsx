import React from 'react';
import { Grid, Typography, Button, CardMedia } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const CartItem = ({ item, onRemove }) => {
  return (
    <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
      <Grid item xs={6}>
        <CardMedia component="img" image={item.thumbnail} alt={item.title} sx={{ width: '100%' }} />
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h6">{item.title}</Typography>
        <Typography variant="body2">{item.description}</Typography>
        <Typography variant="body2">Price: ${item.price}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Button color="secondary" onClick={onRemove}>
          <CloseIcon />
        </Button>
      </Grid>
    </Grid>
  );
};

export default CartItem;
