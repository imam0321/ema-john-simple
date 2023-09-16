import { useLoaderData } from "react-router-dom";
import Cart from "../Cart/Cart";
import './Orders.css';
import ReviewItems from "../ReviewItems/ReviewItems";
import { useState } from "react";
import { removeFromDb } from "../../utilities/fakedb";


const Orders = () => {
  const savedCart = useLoaderData()
  const [cart, setCart] = useState(savedCart);
  const handelRemoveFromCart = (id) =>{
    const remaining = cart.filter(product => product.id !== id);
    setCart(remaining);
    removeFromDb(id);
  };
  return (
    <div className='shop-container'>
      <div className="review-container">
        {
          cart.map(product => <ReviewItems 
            key={product.id}
            product={product}
            handelRemoveFromCart={handelRemoveFromCart}
            ></ReviewItems>)
        }
      </div>
      <div className="cart-container">
        <Cart 
          cart={cart}
          ></Cart>
      </div>
    </div>
  );
};

export default Orders;