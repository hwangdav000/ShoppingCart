import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const AddProductToStore = (product) => {
  return {
    type: actionTypes.ADD_PRODUCT_TO_STORE,
    payload: product,
  };
};

export const GetProductToStore = (product) => {
  return {
    type: actionTypes.GET_PRODUCT_TO_STORE,
    payload: product,
  };
};

export const SaveProductToDB = (newProduct, accessToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return (dispatch) => {
    axios
      .post('http://localhost:9000/product/api/saveproduct', newProduct, config)
      .then((collection) => {
        let loggedProduct = collection.data;
        console.log(loggedProduct);
        dispatch(AddProductToStore(loggedProduct));
      })
      .catch((err) => {
        console.log('error while saving', err);
      });
  };
};

export const updateProductRating = (productRating, accessToken) => {
  return (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .post(
        'http://localhost:9000/product/api/updateProductRating',
        productRating,
        config
      )
      .then((collection) => {
        let loggedProduct = collection.data;
        //console.log(loggedProduct);
      })
      .catch((err) => {
        console.log('error while saving', err);
      });
  };
};

export const SaveProductToDBUsingFetch = (newProduct, accessToken) => {
  return (dispatch) => {
    window
      .fetch('http://localhost:9000/product/api/saveproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newProduct),
      })
      .then((response) => response.json())
      .then((productData) => {
        dispatch(AddProductToStore(productData));
      })
      .catch((err) => {
        console.log('error while logging in ', err);
      });
  };
};

export const getProductsFromDB = (accessToken) => {
  return (dispatch) => {
    // Set up axios request with authorization header
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .get('http://localhost:9000/product/api/getProducts', config)
      .then((response) => {
        const products = response.data; // Assuming the response contains an array of product objects
        dispatch(GetProductToStore(products)); // Dispatch an action to store the retrieved products
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        // Handle error, dispatch an error action, etc.
      });
  };
};
