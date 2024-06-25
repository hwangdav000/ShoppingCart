import React from 'react';
import { useDispatch } from 'react-redux';
import { removeItem, updateItem } from '../../../state/Cart/cartAction.js';
import { Button } from 'react-bootstrap';

const Checkout = (props) => {
  let item = props.item;

  let dispatchItem = useDispatch();

  return (
    <>
      <li
        className="list-group-item"
        key={item.productId}
      >
        <div className="row">
          <div className="col-md-3 text-dark">{item.productName}</div>
          <div className="col-md-2">
            <p>Price: ${item.price}</p>
          </div>
          <div className="col-md-2">
            <input
              type="number"
              defaultValue={item.quantity}
              max={50}
              min={1}
              onChange={(evt) => {
                dispatchItem(updateItem(item._id, evt.target.value));
              }}
            />
          </div>
          <div className="col-md-2">
            <Button
              className="btn "
              onClick={() => dispatchItem(removeItem(item._id))}
            >
              <i className="fa-regular fa-trash-can"></i>
            </Button>
          </div>
        </div>
      </li>
    </>
  );
};

export default Checkout;
