import React, { useState } from 'react';
import { Grid, InputBase, Button, Typography, Paper, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
const Landing = () => {
  const [products, setProducts] = useState([]);

  const handleSearch = (value) => {
    fetchProductsFromAPI(value);
  };

  const fetchProductsFromAPI = async (searchValue) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${searchValue}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data.products);
      console.log(data.products);
    } catch (error) {
      alert('Failed to fetch products. Please try again later.');
    }
  };

  const handleSearchButtonClick = (event) => {
    event.preventDefault();
    const searchValue = event.currentTarget.previousElementSibling.querySelector('input').value;
    handleSearch(searchValue);
  };

  return (
    <div style={{ width: '90%', margin: 'auto' }}>
      <Typography variant="h2" component="div" gutterBottom>
        <span>Shopee</span>Cart
      </Typography>
      <Paper component="form" sx={{ marginBottom: 2, padding: '2px 4px', display: 'flex', alignItems: 'center' }}>
        <InputBase
          sx={{ marginLeft: 1, flex: 1 }}
          placeholder="Search Products"
          inputProps={{ 'aria-label': 'search products' }}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              handleSearch(event.target.value);
            }
          }}
        />
        <IconButton type="submit" sx={{ p: '10px' }} onClick={handleSearchButtonClick}>
          <SearchIcon />
        </IconButton>
      </Paper>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard item={product} />
          </Grid>
        ))}
      </Grid>
      <Cart />
    </div>
  );
};

export default Landing;
