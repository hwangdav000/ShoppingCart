import * as actionTypes from '../actionTypes';

let initialState = {
  notifications: [
    {
      message: 'Add Products from Product Screen',
      navigate: '/product',
    },
    {
      message: 'Add Items from Cart Page',
      navigate: '/store',
    },
    {
      message: 'Review cart from Checkout Page',
      navigate: '/cartDetail',
    },
    {
      message: 'Make Payment from Payment Page',
      navigate: '/cartDetail',
    },
    {
      message: 'Cancel/reorder order',
      navigate: '/order',
    },
  ],
};
/*
Other notif message (these will be populated dynamically)
{
      message: 'Check # items added to the Cart',
      navigate: '/cartDetail',
    }
      
{
      message: 'User has canceled order #',
      navigate: '/order',
    }


*/

let notificationReducer = (state = initialState, action) => {
  console.log('Coupon Actions ', action);

  switch (action.type) {
    case actionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };

    case actionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (_, index) => index !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default notificationReducer;
