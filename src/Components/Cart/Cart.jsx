import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const Cart = ({ cart, handelClearCart, children }) => {

  let totalPrice = 0;
  let totalShipping = 0;
  let quantity = 0;
  for (const product of cart) {
    quantity = quantity + product.quantity;
    totalPrice = totalPrice + product.price * product.quantity;
    totalShipping = totalShipping + product.shipping;
    
  }
  const tax = (totalPrice*7)/100;
  const grandTotal = totalPrice + totalShipping + tax;

  return (
    <div className="cart-info">
      <div className="cart">
       <h3>Order Summary</h3>
       <p>Selected Items: {quantity}</p>
       <p>Total Price: ${totalPrice}</p>
       <p>Total Shipping Charge: ${totalShipping}</p>
       <p>Tax: ${tax.toFixed(2)}</p>
       <h4>Grand Total: ${grandTotal}</h4>
      </div>
      <div className='btn'>
        <button onClick={handelClearCart} className='btn-clear'>
          <p>Clear Cart</p>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
      <div className="btn">
        {children}
      </div>
    </div>
  );
};

export default Cart;