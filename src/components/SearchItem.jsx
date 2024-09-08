import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from './Product';

const SearchItem = ({ cart, setCart }) => {
  const { term } = useParams();
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products?search=${term}`);
        const data = await response.json();
        setFilterData(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [term]);

  return (
    <Product cart={cart} setCart={setCart} items={filterData} />
  );
};

export default SearchItem;
