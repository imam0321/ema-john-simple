import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faArrowRight} from '@fortawesome/free-solid-svg-icons';

const Cart = ({ cart }) => {

  let totalPrice = 0;
  let totalShipping = 0;
  let quantity = 0;
  for (const product of cart) {
    product.quantity = product.quantity || 1;
    totalPrice = totalPrice + product.price * product.quantity;
    totalShipping = totalShipping + product.shipping;
    quantity = quantity + product.quantity;
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
        <button className='btn-clear'>
          <p>Clear Cart</p>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
      <div className="btn">
        <button className='btn-review'>
          <p>Review Order</p>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default Cart;