import * as actionTypes from '../actionTypes';

export const AddCoupon = (coupon) => {
  return {
    type: actionTypes.ADD_COUPON,
    payload: coupon,
  };
};
