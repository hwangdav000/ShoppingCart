let mongooseObj = require('mongoose');
schemaObj = mongooseObj.Schema; //using the schema class from mongoose

//creates db with name mernstack18 or opens a connection if already present
mongooseObj.connect('mongodb://127.0.0.1/mernstack18');

let cartSchema = new schemaObj(
  {
    userId: {
      type: mongooseObj.Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
    userName: String,
    cartItems: [
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

let cartModel = mongooseObj.model('cart', cartSchema); //user - collection name, pluralised by mongodb

module.exports = cartModel;
