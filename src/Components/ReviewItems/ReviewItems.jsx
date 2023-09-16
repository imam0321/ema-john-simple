import './ReviewItems.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ReviewItems = ({ product, handelRemoveFromCart }) => {
  const {id, img, name, quantity, price} = product
  return (
    <div className="review-item">
      <img src={img} alt="" />
      <div className='review-details'>
        <p className='product-title'>{name}</p>
        <p>Price: <span className='orange-text'>${price}</span></p>
        <p>Quantity: <span className='orange-text'>{quantity}</span></p>
      </div>
      <button onClick={()=> handelRemoveFromCart(id)} className='btn-delete'>
        <FontAwesomeIcon className='delete-icon' icon={faTrash} />
      </button>
    </div>
  );
};

export default ReviewItems;