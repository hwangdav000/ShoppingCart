import * as actionTypes from '../actionTypes';

let initialState = {
  order: {
    userId: 0,
    orderList: [],
  },
  ordersList: [],
};

let orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ORDER:
      return {
        ...state,
        ordersList: [...state.ordersList, action.payload],
      };

    case actionTypes.GET_ORDER:
      return { ...state, ordersList: action.payload };

    default:
      return state;
  }
};

export default orderReducer;
