import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, removeFromCart, selectCartItems } from '../redux/cartSlice';
import CartItem from './CartItem';
import axios from 'axios';
const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const handleRemoveItem = async (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:8080/placeorder', cartItems);
      console.log(response.data);
      dispatch(clearCart());
      alert(response.data.message);
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Failed to process checkout. Please try again later.');
    }
  };

  return (
    <Card sx={{ width: 500 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Cart
        </Typography>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} onRemove={() => handleRemoveItem(item.id)} />
        ))}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={handleCheckout}>
          Checkout
        </Button>
      </CardActions>
    </Card>
  );
};

export default Cart;
