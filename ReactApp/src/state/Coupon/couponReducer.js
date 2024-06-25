import * as actionTypes from '../actionTypes';

let initialState = {
  couponValue: '',
};

let couponReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_COUPON:
      console.log('in the coupon reducer', action.payload);
      return { ...state, couponValue: action.payload };

    default:
      return state;
  }
};

export default couponReducer;
