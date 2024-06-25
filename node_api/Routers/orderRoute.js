let express = require('express');
let orderRouter = express.Router({}); //
const { authenticateToken } = require('../Authentication/authenticate');

let OrderDataModel = require('../DataModels/OrderDataModel'); //this gives access to all the methods defined in mongoose to access mongo db data

orderRouter.post('/api/saveorder', authenticateToken, async (req, res) => {
  console.log(req.body);

  try {
    let newOrder = new OrderDataModel(req.body);
    let savedOrder = await newOrder.save();

    res.send(savedOrder);
  } catch (error) {
    console.error('Error while adding order:', error);
    res.status(500).send('Error while adding order');
  }
});

orderRouter.get('/api/getOrders/:userId', authenticateToken, (req, res) => {
  const userId = req.params.userId;

  OrderDataModel.find({ userId: userId })
    .then((orders) => {
      if (orders) {
        res.send(orders);
      } else {
        console.log('orders not found');
      }
    })
    .catch((err) => {
      console.log('err order', err);
      res.send('error while getting orders');
    });
});

orderRouter.post('/api/cancelOrder/:orderId', authenticateToken, (req, res) => {
  const orderId = req.params.orderId;

  OrderDataModel.findOne({ _id: orderId })
    .then((existingOrder) => {
      existingOrder.status = 'CANCELED';
      existingOrder
        .save()
        .then((updatedOrder) => {
          res.send(updatedOrder);
        })
        .catch((err) => {
          console.log('Error updating order status:', err);
          res.status(500).send('Error updating order status');
        });
    })
    .catch((err) => {
      console.log('Error finding order:', err);
      res.status(500).send('Error finding order');
    });
});

orderRouter.post(
  '/api/deliverOrder/:orderId',
  authenticateToken,
  (req, res) => {
    const orderId = req.params.orderId;

    OrderDataModel.findOne({ _id: orderId })
      .then((existingOrder) => {
        existingOrder.status = 'DELIVERED';
        existingOrder
          .save()
          .then((updatedOrder) => {
            res.send(updatedOrder);
          })
          .catch((err) => {
            console.log('Error updating order status:', err);
            res.status(500).send('Error updating deliver status');
          });
      })
      .catch((err) => {
        console.log('Error finding order:', err);
        res.status(500).send('Error finding order');
      });
  }
);

module.exports = orderRouter;
