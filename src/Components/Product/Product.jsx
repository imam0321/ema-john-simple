import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Product = ({ product, handleAddToCart }) => {
  const {img, name, price, seller, ratings} = product;

  return (
    <div className='product'>
      <img src={img ? img : 'No Image Found'} alt="" />
      <div className='product-info'>
        <p className='product-name'>{name}</p>
        <p>Price: ${price}</p>
        <div className="product-manufacture">
          <p><small>Manufacturer: {seller}</small></p>
          <p><small>Ratings: {ratings} Stars</small></p>
        </div> 
      </div>
      <button onClick={ () =>handleAddToCart(product)} className='btn-cart'>
        <p>Add To Cart</p>
        <FontAwesomeIcon icon={faCartShopping} />
      </button>
    </div>
  );
};

export default Product;