let mongooseObj = require('mongoose');
schemaObj = mongooseObj.Schema; //using the schema class from mongoose

//creates db with name mernstack18 or opens a connection if already present
mongooseObj.connect('mongodb://127.0.0.1/mernstack18');

let orderSchema = new schemaObj(
  {
    userId: {
      type: mongooseObj.Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
    orderDate: {
      type: Date,
      required: true,
    },
    status: String,
    price: String,
    userName: String,
    order: [
      {
        productName: String,
        price: Number,
        productId: {
          type: mongooseObj.Schema.Types.ObjectId,
          required: true,
          ref: 'products',
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
  },
  {
    versionKey: false,
  }
);

let orderModel = mongooseObj.model('order', orderSchema); //user - collection name, pluralised by mongodb

module.exports = orderModel;
