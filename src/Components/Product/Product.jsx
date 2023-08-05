import './Product.css';

const Product = ({ product }) => {
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
      <button className='btn-cart'>
        <p>Add To Cart</p>
      </button>
    </div>
  );
};

export default Product;