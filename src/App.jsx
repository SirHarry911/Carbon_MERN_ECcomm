import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios'; // Import axios
import Navbar from './components/Navbar';
import Product from './components/Product';
import ProductDetail from './components/ProductDetail';
import SearchItem from './components/SearchItem';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Login from './components/Login';
import Checkout from './components/Checkout';

const stripePromise = loadStripe('pk_test_51PuzVlBPEHgV1sn71GS4XpYrOR60DNQvXtUOeaYktZ6HXUkro7P6oJh9BH2nEJt0fVnapzWFNMBKzUBzdKyXQf7m00NWBIU6VH');

const App = () => {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setData(response.data); // Set products data from the response
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Router>
      <Navbar cart={cart} setData={setData} products={data} />
      <Routes>
        <Route path="/" element={<Product cart={cart} setCart={setCart} items={data} />} />
        <Route path="/product/:id" element={<ProductDetail cart={cart} setCart={setCart} items={data} />} />
        <Route path="/search/:term" element={<SearchItem cart={cart} setCart={setCart} items={data} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/checkout"
          element={
            <Elements stripe={stripePromise}>
              <Checkout />
            </Elements>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
