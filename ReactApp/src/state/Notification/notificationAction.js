import * as actionTypes from '../actionTypes';

export const AddNotification = (notif) => {
  return {
    type: actionTypes.ADD_NOTIFICATION,
    payload: notif,
  };
};

export const RemoveNotification = (NotifId) => {
  return {
    type: actionTypes.REMOVE_NOTIFICATION,
    payload: NotifId,
  };
};
