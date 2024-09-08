//action - is an object with two properties - type and payload
import * as actionTypes from '../actionTypes';
import emailjs from '@emailjs/browser';
import axios from 'axios';

export const AddOrder = (order) => {
  return {
    type: actionTypes.ADD_ORDER,
    payload: order,
  };
};

export const GetOrders = (orders) => {
  return {
    type: actionTypes.GET_ORDER,
    payload: orders,
  };
};

export const cancelOrder = (id) => ({
  type: actionTypes.CANCEL_ORDER,
  payload: { id }, //id: 4
});

export const SaveOrderToDB = (order, accessToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  console.log('save order before db ', accessToken);
  return (dispatch) => {
    axios
      .post(
        'http://localhost:9000/order/api/saveorder', //uri or end point of singninup api
        order, // the user state object we dispatch from the user component
        config
      )
      .then((response) => {
        let loggedOrder = response.data;
        console.log('Logged order is ' + loggedOrder);

        dispatch(AddOrder(loggedOrder));
        //alert('order has been submitted');
      })
      .catch((err) => {
        console.log('error while saving', err);
      });
  };
};

export const CancelOrderToDB = (id, userId, accessToken) => {
  // Set up config with authorization header
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return (dispatch) => {
    axios
      .post('http://localhost:9000/order/api/cancelOrder/' + id, {}, config)
      .then((response) => {
        let loggedOrder = response.data;
        console.log('logged data', loggedOrder);

        dispatch(getOrdersFromDB(userId, accessToken));
        alert('canceled order');
      })
      .catch((err) => {
        console.log('error while saving', err);
      });
  };
};

export const DeliverOrderToDB = (id, userId, accessToken) => {
  // Set up config with authorization header
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  console.log('this is before deliver order to db', config);

  return (dispatch) => {
    axios
      .post(`http://localhost:9000/order/api/deliverOrder/${id}`, {}, config) // Empty data object needed in post
      .then((response) => {
        let loggedOrder = response.data;
        console.log('logged data', loggedOrder);

        dispatch(getOrdersFromDB(userId, accessToken));
      })
      .catch((err) => {
        console.log('error while saving', err);
      });
  };
};

export const getOrdersFromDB = (id, accessToken) => {
  // Set up config with authorization header
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  console.log('inside orders from db: ', accessToken);
  return (dispatch) => {
    console.log('Requesting orders for ID:', id);
    const path = `http://localhost:9000/order/api/getOrders/${id}`;

    axios
      .get(path, config)
      .then((response) => {
        const orders = response.data;
        dispatch(GetOrders(orders));
        console.log('Orders retrieved from DB:', orders);
      })
      .catch((error) => {
        console.error(
          'Error fetching order:',
          error.response ? error.response.data : error.message
        );
      });
  };
};

export const GenerateOrderPDF = (message, userEmail, accessToken) => {
  // Set up config with authorization header
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return (dispatch) => {
    axios
      .post(
        `http://localhost:9000/order/api/generateOrderPDF/`,
        { message },
        config
      )
      .then((response) => {
        let pdfResponse = response.data;
        console.log('PDF generation response:', pdfResponse);
        // handle email
        emailjs.init(process.env.PUBLIC_KEY);

        var params = {
          sendername: 'ShoppingIT',
          to: userEmail,
          subject: 'Purchase Details',
          message: 'find your purchase details here: ' + pdfResponse,
        };

        emailjs
          .send(process.env.SERVICE_ID, process.env.TEMPLATE_ID, params)
          .then((response) => {
            console.log(
              'Email sent successfully:',
              response.status,
              response.text
            );
            setEmailSent(true);
          })
          .catch((err) => {
            console.error('Failed to send email:', err);
          });
      })
      .catch((err) => {
        console.log('Error while generating PDF:', err);
      });
  };
};
