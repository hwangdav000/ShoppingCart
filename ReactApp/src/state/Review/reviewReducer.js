import * as actionTypes from '../actionTypes';

let initialState = {
  productReviews: [],
};

let reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_REVIEWS:
      return { ...state, productReviews: action.payload };

    default:
      return state;
  }
};

export default reviewReducer;
