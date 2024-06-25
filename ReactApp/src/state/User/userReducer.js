import * as actionTypes from '../actionTypes';

let initialState = {
  user: {
    _id: '',
    userName: 'Dummy',
    password: 'asdsadasda',
    street: 'somewhere on earth',
    mobile: 898989898,
    hobbies: [],
  },
  login: false,
};

// action => type and payload

let userReducer = (state = initialState, action) => {
  console.log('User Actions ', action);

  switch (action.type) {
    case actionTypes.ADD_USER_TO_STORE:
      //...state == is extracting all the states present in store
      //action.payload - is the new user data that we need to add to store
      //User: action.payload - new payload is assigned to used
      console.log('action payload' + action.payload);
      return { ...state, user: action.payload }; //new state dispatched to store upon update
    case actionTypes.LOGIN_USER:
      //...state == is extracting all the states present in store
      //action.payload - is the new user data that we need to add to store
      //User: action.payload - new payload is assigned to used
      console.log('action payload' + action.payload);
      return { ...state, user: action.payload }; //new state dispatched to store upon update

    case actionTypes.UPDATE_LOGIN:
      return { ...state, login: action.payload }; //new state dispatched to store upon update

    case actionTypes.RESET_LOGIN:
      return { ...state, login: false }; //new state dispatched to store upon update

    case actionTypes.ADD_HOBBIES_TO_STORE:
      return {
        ...state,
        user: { ...state.user, hobbies: action.payload },
      };

    case actionTypes.GET_HOBBIES_TO_STORE:
      return {
        ...state,
        user: { ...state.user, hobbies: action.payload },
      };
    default:
      return state; //if no action type matched return default state
  }
};

export default userReducer;
