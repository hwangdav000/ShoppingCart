let express = require('express');
const { v4: uuidv4 } = require('uuid');
let orderRouter = express.Router({}); //
const { authenticateToken } = require('../Authentication/authenticate');
const { generatePDFAndSave } = require('../GeneratePDF/generatePdf');
const { uploadPDFToS3 } = require('../AWS/aws');
let OrderDataModel = require('../DataModels/OrderDataModel');

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

orderRouter.post(
  '/api/generateOrderPDF',
  authenticateToken,
  async (req, res) => {
    try {
      console.log('generating order pdf');
      const { message } = req.body;
      const pdf = await generatePDFAndSave(message);

      // generate unique id
      const uniqueId = uuidv4();

      const url = await uploadPDFToS3(pdf, `orderPDF_${uniqueId}`);
      console.log('the url is ' + url);
      res.status(200).send(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).send('Error generating PDF.');
    }
  }
);

module.exports = orderRouter;
