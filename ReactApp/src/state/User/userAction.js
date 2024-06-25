import * as actionTypes from '../actionTypes';
import { AddTokenToStore } from '../Token/tokenAction.js';
import axios from 'axios';

export const AddUserToStore = (user) => {
  return {
    type: actionTypes.ADD_USER_TO_STORE,
    payload: user,
  };
};

export const AddHobbiesToStore = (hobbies) => {
  return {
    type: actionTypes.ADD_HOBBIES_TO_STORE,
    payload: hobbies,
  };
};

export const GetHobbiesToStore = (hobbies) => {
  return {
    type: actionTypes.GET_HOBBIES_TO_STORE,
    payload: hobbies,
  };
};

export const LoginUserToStore = (user) => {
  return {
    type: actionTypes.LOGIN_USER,
    payload: user,
  };
};

export const UpdateLoginToStore = (state) => {
  return {
    type: actionTypes.UPDATE_LOGIN,
    payload: state,
  };
};

//to save user to mongo db and do sign-in or sign up
export const LoginUserDB = (user) => {
  return (dispatch) => {
    axios
      .post(
        'http://localhost:9000/user/api/login', //uri or end point of singninup api
        user // the user state object we dispatch from the user component
      )
      .then((collection) => {
        let loggedUser = collection.data.existingUser;
        let accessToken = collection.data.accessToken;
        let refreshToken = collection.data.refreshToken;

        dispatch(UpdateLoginToStore(true));
        dispatch(LoginUserToStore(loggedUser));
        dispatch(AddTokenToStore({ accessToken, refreshToken }));
      })
      .catch((err) => {
        console.log('error while logging in ', err);
      });
  };
};

//server call
//to save user to mongo db and do sign-in or sign up
export const SaveUserToDB = (newUser) => {
  return (dispatch) => {
    axios
      .post(
        'http://localhost:9000/user/api/signinup', //uri or end point of singninup api
        newUser // the user state object we dispatch from the user component
      )
      .then((collection) => {
        let loggedUser = collection.data;
        dispatch(AddUserToStore(loggedUser));
      })
      .catch((err) => {
        console.log('error while logging in ', err);
      });
  };
};

export const SaveUserToDBUsingFetch = (newUser) => {
  return (dispatch) => {
    window
      .fetch('http://localhost:9000/user/api/signinup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })
      .then((response) => response.json())
      .then((userData) => {
        dispatch(AddUserToStore(userData));
        return true;
      })
      .catch((err) => {
        console.log('error while logging in ', err);
        return false;
      });
  };
};

export const SaveHobbiesToDBUsingFetch = (user) => {
  return (dispatch) => {
    window
      .fetch('http://localhost:9000/user/api/addhobby', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      .then((response) => response.json())
      .then((userData) => {
        dispatch(AddHobbiesToStore(userData));
      })
      .catch((err) => {
        console.log('error while logging in ', err);
      });
  };
};

export const getHobbiesFromDB = (userName) => {
  return (dispatch) => {
    axios
      .get('http://localhost:9000/student/api/getHobbies/${userName}')
      .then((response) => {
        const hobbies = response.data; // Assuming the response contains an array of student
        console.log(hobbies);
        dispatch(GetHobbiesToStore(hobbies)); // Dispatch an action to store the retrieved students
      })
      .catch((error) => {
        console.error('Error fetching hobbies:', error);
        // Handle error, dispatch an error action, etc.
      });
  };
};
