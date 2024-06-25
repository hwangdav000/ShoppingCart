import * as actionTypes from '../actionTypes';

let initialState = {
  accessToken: '',
  refreshToken: '',
};

let tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TOKEN_TO_STORE:
      const { accessToken, refreshToken } = action.payload;
      return { ...state, accessToken, refreshToken };

    default:
      return state;
  }
};

export default tokenReducer;
