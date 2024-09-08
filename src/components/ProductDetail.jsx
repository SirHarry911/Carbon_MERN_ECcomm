import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = ({ cart, setCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null); // Set initial state to null
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        console.log('API Response:', response); // Debugging log
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        console.log('Product Data:', data); // Debugging log
        setProduct(data);

        // Fetch related products based on category
        const relatedResponse = await fetch(`http://localhost:5000/api/products?category=${data.category}`);
        const relatedData = await relatedResponse.json();
        setRelatedProducts(relatedData.filter(prod => prod._id !== data._id));
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to fetch product. Please try again later.');
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    toast.success("Item added to cart", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  // Debugging log for error state
  console.log('Error State:', error);

  if (error) {
    return <div className="text-center my-5">{error}</div>;
  }

  if (!product) {
    return <div className="text-center my-5">Loading...</div>;
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="container con">
        <div className="img">
          <img src={product.imgSrc} alt={product.title} />
        </div>
        <div className="text-center">
          <h1 className="card-title">{product.title}</h1>
          <p className="card-text">{product.description}</p>
          <p className="card-text">{product.detailedDescription}</p>

          <button className="btn btn-primary mx-3">{product.price} ₹</button>
          <button
            onClick={() => addToCart(product)}
            className="btn btn-warning"
          >
            Add To Cart
          </button>
        </div>
      </div>
      <h1 className="text-center">Related Products</h1>
      <div className="container my-5">
        <div className="row">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct._id} className="col-lg-4 col-md-6 my-3 text-center">
              <div className="card" style={{ width: "18rem" }}>
                <Link to={`/product/${relatedProduct._id}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={relatedProduct.imgSrc} className="card-img-top" alt={relatedProduct.title} />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{relatedProduct.title}</h5>
                  <p className="card-text">{relatedProduct.description}</p>
                  <button className="btn btn-primary mx-3">{relatedProduct.price} ₹</button>
                  <button
                    onClick={() => addToCart(relatedProduct)}
                    className="btn btn-warning"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;