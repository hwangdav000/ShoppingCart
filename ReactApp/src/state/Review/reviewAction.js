import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const GetReviews = (Reviews) => {
  return {
    type: actionTypes.GET_REVIEWS,
    payload: Reviews,
  };
};

export const SaveReviewsToDB = (Reviews, accessToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return (dispatch) => {
    axios
      .post('http://localhost:9000/review/api/saveReviews', Reviews, config)
      .then((response) => {
        let loggedReview = response.data;
        //console.log('logged data', loggedReview);
      })
      .catch((err) => {
        console.log('error while saving', err);
      });
  };
};

export const getReviewsFromDB = (productId, accessToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return (dispatch) => {
    var path = 'http://localhost:9000/Review/api/getReviews/' + productId;
    axios
      .get(path, config)
      .then((response) => {
        const Reviews = response.data;
        dispatch(GetReviews(Reviews));
      })
      .catch((error) => {
        console.error('Error fetching Review:', error);
      });
  };
};
