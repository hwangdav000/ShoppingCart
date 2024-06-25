import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getCartFromDB,
  SaveCartToDB2,
} from '../../../state/Cart/cartAction.js';
import { AddNotification } from '../../../state/Notification/notificationAction.js';
import { Col, Row, Button } from 'react-bootstrap';
import { getProductsFromDB } from '../../../state/Product/productAction.js';
import StoreItem from './StoreItem.js';

const Shop = () => {
  const accessToken = useSelector((store) => store.tokenReducer.accessToken);
  let ProductList = useSelector((state) => state.productReducer.productList);
  const user = useSelector((store) => store.userReducer.user);
  const userCart = useSelector((store) => store.cartReducer.cart);

  const cartList = userCart ? userCart.cartList : [];

  const navigate = useNavigate();
  const dispatchToDB = useDispatch();

  const [cartItems, setCartItems] = useState(cartList);

  const handleIncrement = (productName, productId, price) => {
    if (!user._id) {
      alert('Please Sign In to Add to Cart');
      return -1;
    }
    const itemIdx = cartItems.findIndex(
      (item) => item.productName === productName
    );
    let updatedCartItems;
    if (itemIdx === -1) {
      updatedCartItems = [
        ...cartItems,
        { productName, productId, price, quantity: 1 },
      ];
    } else {
      updatedCartItems = cartItems.map((item, index) =>
        index === itemIdx ? { ...item, quantity: item.quantity + 1 } : item
      );
    }
    setCartItems(updatedCartItems);
    saveCart(updatedCartItems);
    return 1;
  };

  const handleDecrement = (productName) => {
    const itemIdx = cartItems.findIndex(
      (item) => item.productName === productName
    );
    let updatedCartItems;
    if (itemIdx !== -1) {
      if (cartItems[itemIdx].quantity === 1) {
        updatedCartItems = cartItems.filter(
          (item) => item.productName !== productName
        );
      } else {
        updatedCartItems = cartItems.map((item, index) =>
          index === itemIdx ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      setCartItems(updatedCartItems);
      saveCart(updatedCartItems);
    } else {
      console.log('Error handling decrement');
    }
  };

  let saveCart = (updatedCartItems) => {
    let newCart = {
      userId: user._id,
      userName: user.userName,
      cartItems: updatedCartItems,
    };

    if (user._id !== '') {
      dispatchToDB(SaveCartToDB2(newCart, accessToken));
    } else {
      alert('Please Sign In to Add to Cart');
    }
  };

  let navCart = () => {
    let quantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    let cartNotification = {
      message: quantity + ' items added to the Cart',
      navigate: '/cartDetail',
    };

    if (user._id !== '') {
      if (quantity > 0) {
        dispatchToDB(AddNotification(cartNotification));
      }

      navigate('/cartDetail');
    } else {
      alert('Please Sign In to Add to Cart');
    }
  };

  useEffect(() => {
    if (!accessToken) {
      console.log('waiting on access token');
      return;
    }

    dispatchToDB(getProductsFromDB(accessToken));
    dispatchToDB(getCartFromDB(user._id, accessToken));
  }, [dispatchToDB, user._id, accessToken]);

  useEffect(() => {
    setCartItems(cartList);
  }, [userCart, cartList]);

  return (
    <>
      <h1>Store</h1>
      <Row
        md={2}
        xs={1}
        lg={3}
        className="g-3"
      >
        {ProductList.map((item) => {
          const cartItem = cartItems.find(
            (cartItem) => cartItem.productId === item._id
          );

          const quantity = cartItem ? cartItem.quantity : 0;
          console.log('q', quantity);
          return (
            <Col key={item._id}>
              <StoreItem
                {...item}
                addToCart={handleIncrement}
                subtractToCart={handleDecrement}
                initQuantity={quantity}
              />
            </Col>
          );
        })}
      </Row>

      <div>
        <Button
          variant="primary"
          onClick={() => navCart()}
          size="lg"
          className="mx-auto d-block mt-5 mb-3"
        >
          Save Cart and Checkout
        </Button>
      </div>
    </>
  );
};

export default Shop;
