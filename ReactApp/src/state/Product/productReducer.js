import * as actionTypes from '../actionTypes';

let initialState = {
  product: {
    _id: '',
    productName: 'product name',
    price: 0,
    desc: 'some description',
    rating: 0,
  },
  productList: [],
};

let productReducer = (state = initialState, action) => {
  console.log('Product Actions ', action);

  switch (action.type) {
    case actionTypes.ADD_PRODUCT_TO_STORE:
      return { ...state, product: action.payload };

    case actionTypes.GET_PRODUCT_TO_STORE:
      return { ...state, productList: action.payload };

    default:
      return state;
  }
};

export default productReducer;
