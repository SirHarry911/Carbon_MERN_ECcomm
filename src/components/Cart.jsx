import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const groupProducts = (cart) => {
    const grouped = {};
    cart.forEach((product) => {
      if (grouped[product.id]) {
        grouped[product.id].quantity += 1;
      } else {
        grouped[product.id] = { ...product, quantity: 1 };
      }
    });
    return Object.values(grouped);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex((product) => product.id === id);
      if (index !== -1) {
        const newCart = [...prevCart];
        newCart.splice(index, 1);
        return newCart;
      }
      return prevCart;
    });
  };

  const handleBuyNow = (product) => {
    navigate('/checkout', { state: { products: [product] } });
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { products: cart } });
  };

  const groupedCart = groupProducts(cart);
  const totalPrice = groupedCart.reduce((total, product) => total + product.price * product.quantity, 0);

  return (
    <>
      <div className="container my-5">
        {cart.length === 0 ? (
          <div className="text-center">
            <h1>Your Cart is Empty</h1>
            <Link to="/" className="btn btn-warning">
              Continue Shopping...
            </Link>
          </div>
        ) : (
          groupedCart.map((product) => (
            <div key={product.id} className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={product.imgSrc} className="img-fluid rounded-start" alt={product.title} />
                </div>
                <div className="col-md-8">
                  <div className="card-body text-center">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                    <button className="btn btn-primary mx-3">
                      {product.price} ₹
                    </button>
                    <button className="btn btn-warning mx-3" onClick={() => handleBuyNow(product)}>
                      Buy Now
                    </button>
                    <div className="mt-3">
                      <span className="badge bg-secondary">Quantity: {product.quantity}</span>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="btn btn-danger mx-2"
                      >
                        Remove One
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length !== 0 && (
        <div className="container text-center my-5">
          <h3>Total Price: ₹{totalPrice}</h3>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button className="btn btn-warning mx-5" onClick={handleCheckout}>CheckOut</button>
            <button onClick={() => setCart([])} className="btn btn-danger">Clear Cart</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
