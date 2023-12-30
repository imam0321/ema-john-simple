import { Link, useLoaderData } from "react-router-dom";
import Cart from "../Cart/Cart";
import "./Orders.css";
import ReviewItems from "../ReviewItems/ReviewItems";
import { useState } from "react";
import { deleteShoppingCart, removeFromDb } from "../../utilities/fakedb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Orders = () => {
  const savedCart = useLoaderData();
  const [cart, setCart] = useState(savedCart);

  const handelRemoveFromCart = (id) => {
    const remaining = cart.filter((product) => product._id !== id);
    setCart(remaining);
    removeFromDb(id);
  };

  const handelClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };
  return (
    <div className="shop-container">
      <div className="review-container">
        {cart.map((product) => (
          <ReviewItems
            key={product._id}
            product={product}
            handelRemoveFromCart={handelRemoveFromCart}
          ></ReviewItems>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart} handelClearCart={handelClearCart}>
          <Link className="btn-link" to="/checkout">
            <button className="btn-review">
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
