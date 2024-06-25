//action - is an object with two properties - type and payload
import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const AddCart = (cart) => {
  return {
    type: actionTypes.ADD_CART,
    payload: cart,
  };
};

export const GetCart = (cart) => {
  return {
    type: actionTypes.GET_CART,
    payload: cart,
  };
};

export const removeItem = (id) => ({
  type: actionTypes.REMOVE_ITEM,
  payload: { id },
});

export const updateItem = (id, qty) => ({
  type: actionTypes.UPDATE_ITEM,
  payload: {
    id,
    quantity: parseInt(qty),
  },
});

export const clearCart = () => {
  return {
    type: actionTypes.CLEAR_CART,
  };
};

export const SaveCartToDB = (cart, accessToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return (dispatch) => {
    axios
      .post(
        'http://localhost:9000/cart/api/savecart', //uri or end point of singninup api
        cart, // the user state object we dispatch from the user component
        config
      )
      .then((response) => {
        let loggedCart = response.data;
        dispatch(AddCart(loggedCart));
      })
      .catch((err) => {
        console.log('error while saving', err);
      });
  };
};

export const SaveCartToDB2 = (cart, accessToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return (dispatch) => {
    axios
      .post(
        'http://localhost:9000/cart/api/savecart', //uri or end point of singninup api
        cart, // the user state object we dispatch from the user component
        config
      )
      .then((response) => {
        let loggedCart = response.data;
        //console.log('logged data', loggedCart);
      })
      .catch((err) => {
        console.log('error while saving', err);
      });
  };
};

// Clear cart
export const ClearCartToDB = (id, accessToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return (dispatch) => {
    axios
      .delete('http://localhost:9000/cart/api/clearCart/' + id, config)
      .then((response) => {
        let loggedCart = response.data;
        dispatch(clearCart());
      })
      .catch((err) => {
        console.log('error while saving', err);
      });
  };
};

export const getCartFromDB = (id, accessToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return (dispatch) => {
    console.log(id);
    var path = 'http://localhost:9000/cart/api/getCart/' + id;
    axios
      .get(path, config)
      .then((response) => {
        const cart = response.data;
        dispatch(GetCart(cart));
      })
      .catch((error) => {
        console.error('Error fetching cart:', error);
      });
  };
};
