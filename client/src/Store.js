// src/store.js

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './redux/cartSlice'; // Replace with your actual path to cartSlice or relevant reducers

const store = configureStore({
  reducer: {
    cart: cartReducer, // Add more reducers as needed
  },
});

export default store;
