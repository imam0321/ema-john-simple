import { useState } from "react";
import "./Shop.css";
import { useEffect } from "react";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../../utilities/fakedb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useLoaderData } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPager, setItemsPerPager] = useState(10);
  const { totalProducts } = useLoaderData();

  const totalPages = Math.ceil(totalProducts / itemsPerPager);

  const pageNumbers = [...Array(totalPages).keys()];

  // useEffect(() => {
  //   fetch("http://localhost:5000/products")
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data));
  // }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPager}`
      );
      const data = await response.json();
      setProducts(data);
    }
    fetchData();
  }, [currentPage, itemsPerPager]);

  useEffect(() => {
    const storedCart = getShoppingCart();

    const ids = Object.keys(storedCart);
    fetch("http://localhost:5000/productsByIds", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((cartProducts) => {
        const savedCart = [];
        for (const id in storedCart) {
          const addedProduct = cartProducts.find(
            (product) => product._id === id
          );
          if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
          }
        }
        setCart(savedCart);
      });
  }, []);

  const handleAddToCart = (selectedProduct) => {
    let newCart = 0;
    const exists = cart.find((product) => product._id === selectedProduct._id);
    if (!exists) {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];
    } else {
      const rest = cart.filter(
        (product) => product._id !== selectedProduct._id
      );
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, exists];
    }
    setCart(newCart);
    addToDb(selectedProduct._id);
  };

  const handelClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  const options = [5, 10, 20];
  const handleSelectChange = (event) => {
    setItemsPerPager(parseInt(event.target.value));
    setCurrentPage(0);
  };

  return (
    <>
      <div className="shop-container">
        <div className="products-container">
          {products.map((product) => (
            <Product
              key={product._id}
              product={product}
              handleAddToCart={handleAddToCart}
            ></Product>
          ))}
        </div>
        <div className="cart-container">
          <Cart cart={cart} handelClearCart={handelClearCart}>
            <Link className="btn-link" to="/orders">
              <button className="btn-review">
                <p>Review Order</p>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </Link>
          </Cart>
        </div>
      </div>
      {/* pagination */}
      <div className="pagination">
        <p>currentPage: {currentPage}</p>
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={currentPage === number ? "selected" : ""}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </button>
        ))}
        <select
          className="select-option"
          value={itemsPerPager}
          onChange={handleSelectChange}
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Shop;
