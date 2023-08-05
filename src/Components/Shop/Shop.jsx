import { useState } from 'react';
import './Shop.css';
import { useEffect } from 'react';

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    fetch('products.json')
    .then(res => res.json())
    .then(data => setProducts(data))
  }, [])

  return (
    <div className='shop-container'>
      <div className="products-container">
        <h1>product {products.length}</h1>
      </div>
      <div className="cart-container">
          <h1>cart</h1>
      </div>
    </div>
  );
};

export default Shop;