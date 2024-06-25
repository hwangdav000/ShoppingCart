import * as actionTypes from '../actionTypes';

let initialState = {
  cart: {
    userId: 0,
    cartList: [],
  },
};

let cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_CART:
      return {
        ...state,
        cart: {
          userId: action.payload.userId,
          cartList: action.payload.cartItems,
        },
      };

    case actionTypes.GET_CART:
      return { ...state, cart: { ...state.cart, cartList: action.payload } };

    case actionTypes.REMOVE_ITEM:
      return {
        ...state,
        cart: {
          ...state.cart,
          cartList: state.cart.cartList.filter(
            (item) => item._id !== action.payload.id
          ),
        },
      };

    case actionTypes.UPDATE_ITEM:
      return {
        ...state,
        cart: {
          ...state.cart,
          cartList: state.cart.cartList.map((item) => {
            if (item._id === action.payload.id) {
              return { ...item, quantity: action.payload.quantity };
            }
            return item;
          }),
        },
      };

    case actionTypes.CLEAR_CART:
      return { ...state, cart: { ...state.cart, cartList: [] } };
    default:
      return state;
  }
};

export default cartReducer;
