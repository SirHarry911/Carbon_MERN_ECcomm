import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import './checkout.css'; // Import the CSS file

const Checkout = () => {
  const location = useLocation();
  const { products } = location.state || { products: [] };
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');

  // Group products by title and sum up their quantities
  const groupedProducts = products.reduce((acc, product) => {
    const existingProduct = acc.find(p => p.title === product.title);
    if (existingProduct) {
      existingProduct.quantity += product.quantity || 1;
    } else {
      acc.push({ ...product, quantity: product.quantity || 1 });
    }
    return acc;
  }, []);

  useEffect(() => {
    if (groupedProducts.length > 0) {
      const totalAmount = groupedProducts.reduce((total, product) => {
        const productPrice = product.price || 0;
        const productQuantity = product.quantity || 1;
        return total + productPrice * productQuantity;
      }, 0);
      axios.post('http://localhost:3001/create-payment-intent', { amount: totalAmount * 100 })
        .then(res => {
          console.log('Client secret:', res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        })
        .catch(error => console.error(error));
    }
  }, [groupedProducts]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      console.error(error);
    } else if (paymentIntent.status === 'succeeded') {
      console.log('Payment successful!');
      // Handle successful payment here (e.g., show a success message, clear cart, etc.)
    }
  };

  if (groupedProducts.length === 0) {
    return <div className="checkout-container">No products to checkout</div>;
  }

  const totalPrice = groupedProducts.reduce((total, product) => {
    const productPrice = product.price || 0;
    const productQuantity = product.quantity || 1;
    return total + productPrice * productQuantity;
  }, 0);

  return (
    <div className="checkout-container">
      <form onSubmit={handleSubmit} className="checkout-form">
        <h2>Checkout</h2>
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          {groupedProducts.map((product, index) => (
            <p key={index}>
              {product.title} x {product.quantity} - ₹{product.price * product.quantity}
            </p>
          ))}
          <p><strong>Total: ₹{totalPrice}</strong></p>
        </div>
        <div className="StripeElement">
          <CardElement />
        </div>
        <button type="submit" disabled={!stripe || !clientSecret} className="btn btn-primary">
          Pay ₹{totalPrice}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
