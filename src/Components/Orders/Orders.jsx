import { Link, useLoaderData } from "react-router-dom";
import Cart from "../Cart/Cart";
import './Orders.css';
import ReviewItems from "../ReviewItems/ReviewItems";
import { useState } from "react";
import { deleteShoppingCart, removeFromDb } from "../../utilities/fakedb";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


const Orders = () => {
  const savedCart = useLoaderData()
  const [cart, setCart] = useState(savedCart);

  const handelRemoveFromCart = (id) =>{
    const remaining = cart.filter(product => product.id !== id);
    setCart(remaining);
    removeFromDb(id);
  };

  const handelClearCart = () =>{
    setCart([]);
    deleteShoppingCart();
  }
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
          handelClearCart={handelClearCart}
          >
           <Link className="btn-link" to='/inventory'>
              <button className='btn-review'>
                <p>Checkout item</p>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
           </Link>             
          </Cart>
      </div>
    </div>
  );
};

export default Orders;