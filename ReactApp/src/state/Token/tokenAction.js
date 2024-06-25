import * as actionTypes from '../actionTypes';

export const AddTokenToStore = (tokens) => {
  return {
    type: actionTypes.ADD_TOKEN_TO_STORE,
    payload: tokens,
  };
};
