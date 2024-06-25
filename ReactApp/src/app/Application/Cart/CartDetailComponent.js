import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getCartFromDB,
  SaveCartToDB2,
} from '../../../state/Cart/cartAction.js';
import CheckoutItem from '../Checkout/CheckoutItem.js';
import CheckoutSummary from '../Checkout/CheckoutSummary.js';

const CartDetail = () => {
  const accessToken = useSelector((store) => store.tokenReducer.accessToken);

  // Need to show the Name and Address of the user
  const user = useSelector((store) => store.userReducer.user);

  const [couponApplied, setCouponApplied] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const userName = user.userName;
  const userAddress = user.street;

  const orders = useSelector((store) => store.orderReducer.order);
  const orderList = orders ? orders.orderList : [];

  // get cart items
  // later when showing cart
  const dispatchToDB = useDispatch();

  let clickToSaveCart = () => {
    let newCart = {
      userId: user._id,
      userName: userName,
      cartItems: cartList,
    };
    if (!user._id) {
      alert('Please sign in to save the cart!!!');
    } else {
      dispatchToDB(SaveCartToDB2(newCart, accessToken));
    }
  };

  // // get user cart I think I want to add product name later
  const userCart = useSelector((store) => store.cartReducer.cart);
  const cartList = userCart ? userCart.cartList : [];
  // Calculate total price only when cartList is available

  useEffect(() => {
    if (!accessToken) {
      console.log('waiting on access token');
      return;
    }
    dispatchToDB(getCartFromDB(user._id, accessToken));
  }, [dispatchToDB, accessToken]);

  useEffect(() => {
    // set total price
    if (cartList) {
      if (cartList) {
        let calculatedTotalPrice = cartList.reduce((total, item) => {
          return total + item.quantity * item.price;
        }, 0);

        if (couponApplied) {
          // 10% discount
          calculatedTotalPrice = calculatedTotalPrice * 0.9;
        }

        setTotalPrice(calculatedTotalPrice);
      }
    }
    clickToSaveCart();
  }, [cartList, couponApplied]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9">
          <div>
            <div className="row">
              <div className="col-md-6">
                <h2>Your Cart</h2>
              </div>
            </div>
            <ul className="list-group list-group-flush">
              {cartList.map((item) => {
                //return item.name
                return (
                  <CheckoutItem
                    item={item}
                    key={item._id}
                  />
                );
              })}

              <li className="list-group-item">
                <h2>Shipping Details</h2>
                <p>
                  <strong>Name:</strong> {user.userName}
                </p>
                <p>
                  <strong>Mobile:</strong> {user.mobile}
                </p>
                <p>
                  <strong>Address:</strong> {user.street}
                </p>
                {/*
                <div className="alert alert-primary">
                  <i className="bi bi-info-circle"></i> Please confirm the
                  address details above
                </div>
                */}
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-3">
          <CheckoutSummary cartList={cartList} />
        </div>
      </div>
    </div>
  );
};

export default CartDetail;
