let mongooseObj = require('mongoose');
schemaObj = mongooseObj.Schema; //using the schema class from mongoose

//creates db with name mernstack18 or opens a connection if already present
mongooseObj.connect('mongodb://127.0.0.1/mernstack18');

let reviewSchema = new schemaObj(
  {
    productId: {
      type: mongooseObj.Schema.Types.ObjectId,
      required: true,
      ref: 'products',
    },
    userId: {
      type: mongooseObj.Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
    rating: Number,
    comment: String,
    productName: String,
  },
  {
    versionKey: false, //false - set to false then it wont create in mongodb
  }
);

let reviewModel = mongooseObj.model('review', reviewSchema);

module.exports = reviewModel;
