import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button, Grid, Chip } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(item));
  };

  return (
    <Card sx={{ width: 300, marginBottom: 2, marginTop: 2 }}>
      <CardMedia
        component="img"
        alt={item.title}
        height="200"
        image={item.thumbnail}
        title={item.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {item.description}
        </Typography>
        <Grid container spacing={1} sx={{ marginTop: 1 }}>
          <Grid item>
            <Chip label={`$${item.price}`} color="primary" />
          </Grid>
          <Grid item>
            <Chip label={`${item.discountPercentage}% off`} color="secondary" />
          </Grid>
        </Grid>
        <Grid container spacing={1} sx={{ marginTop: 1 }}>
          <Grid item>
            <Chip label={`Rating: ${item.rating}`} color="default" />
          </Grid>
          <Grid item>
            <Chip label={`Stock: ${item.stock}`} color="default" />
          </Grid>
        </Grid>
        <Typography variant="body2" color="textPrimary" sx={{ marginTop: 1 }}>
          Brand: {item.brand}
        </Typography>
        <Typography variant="body2" color="textPrimary">
          Category: {item.category}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
