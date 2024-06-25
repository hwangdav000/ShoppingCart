import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ClearCartToDB } from '../../../state/Cart/cartAction.js';
import { Button, Form } from 'react-bootstrap';
import { SaveOrderToDB } from '../../../state/Order/orderAction.js';

const CartTotal = (props) => {
  const accessToken = useSelector((store) => store.tokenReducer.accessToken);

  let cartList = props.cartList;

  // Get access to products from store
  const products = useSelector((store) => store.productReducer.productList);
  const user = useSelector((store) => store.userReducer.user);

  const couponStoreValue = useSelector(
    (store) => store.couponReducer.couponValue
  );

  // state for mapped cart items
  const [cartItems, setCartItems] = useState([]);
  const [couponValue, setCouponValue] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  const dispatchToDB = useDispatch();

  // Function to map current cart items to products
  const mapCartListToProducts = () => {
    if (cartList.length > 0) {
      const newCartItems = cartList
        .map((item) => {
          const product = products.find(
            (product) => product._id === item.productId
          );
          if (product) {
            return {
              productId: product._id,
              name: product.name,
              price: product.price,
              quantity: item.quantity,
            };
          }
          return null;
        })
        .filter((item) => item !== null);
      setCartItems(newCartItems);
      setTotalPrice(
        newCartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
      );
    }
  };

  // Check if coupon value is correct and apply to total price
  const applyCoupon = () => {
    if (couponValue === couponStoreValue) {
      alert('Valid coupon');
      setCouponApplied(true);
      const discountAmount = totalPrice * 0.1; // 10% discount
      setDiscount(discountAmount);
      setTotalPrice((prevPrice) => prevPrice - discountAmount);
    } else {
      alert('Invalid coupon');
      setCouponApplied(false);
      setTotalPrice(
        cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
      );
    }
  };

  const purchaseCart = () => {
    const currentDate = new Date();
    console.log(currentDate);
    let newOrder = {
      userId: user._id,
      status: 'IN TRANSIT',
      orderDate: currentDate,
      price: totalPrice,
      userName: user.userName,
      order: cartList,
    };
    if (!user._id) {
      alert('Please sign in to save the cart!!!');
    } else {
      dispatchToDB(SaveOrderToDB(newOrder, accessToken));
      alert('Cart has been purchased');

      // need to clear the cart
      dispatchToDB(ClearCartToDB(user._id, accessToken));
    }
  };

  useEffect(() => {
    mapCartListToProducts();
  }, [cartList, products]);

  return (
    <div className="card">
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <h2>Order Summary</h2>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col">Quantity</div>
            <div className="col">
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </div>
          </div>
          <div className="row">
            <div className="col">Items</div>
            <div className="col">
              $
              {cartItems
                .reduce((acc, item) => acc + item.quantity * item.price, 0)
                .toFixed(2)}
            </div>
          </div>
          {couponApplied && (
            <div className="row">
              <div className="col">Discount</div>
              <div className="col">-${discount.toFixed(2)}</div>
            </div>
          )}
          <div className="row">
            <div className="col">Total</div>
            <div className="col">${totalPrice.toFixed(2)}</div>
          </div>
        </li>

        <li className="list-group-item">
          <Form>
            <Form.Group controlId="formCoupon">
              <Form.Label>Apply Coupon:</Form.Label>
              <Form.Control
                type="text"
                value={couponValue}
                onChange={(evt) => setCouponValue(evt.target.value)}
                placeholder="Enter coupon code"
              />
              <Button
                onClick={applyCoupon}
                className="btn "
              >
                Apply
              </Button>
            </Form.Group>
          </Form>
        </li>

        <li className="list-group-item">
          <Button
            className="mt-3 w-100 btn"
            onClick={purchaseCart}
          >
            Purchase
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default CartTotal;
