let express = require('express');
let productRouter = express.Router({}); //
const { authenticateToken } = require('../Authentication/authenticate');

let ProductDataModel = require('../DataModels/ProductDataModel'); //this gives access to all the methods defined in mongoose to access mongo db data

productRouter.post(
  '/api/updateProductRating',
  authenticateToken,
  async (req, res) => {
    try {
      const { productId, newRating } = req.body;

      // Find the existing product
      const existingProduct = await ProductDataModel.findOne({
        _id: productId,
      });

      if (existingProduct) {
        const { rating, reviewCount } = existingProduct;
        const newReviewCount = reviewCount + 1;
        const newAverageRating =
          (rating * reviewCount + newRating) / newReviewCount;

        // Update the product's rating and review count
        existingProduct.rating = newAverageRating;
        existingProduct.reviewCount = newReviewCount;

        // Save the updated product
        await existingProduct.save();

        res.status(200).json({
          message: 'Product rating updated successfully',
          product: existingProduct,
        });
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (err) {
      console.error('Error updating product rating:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

productRouter.post('/api/saveproduct', authenticateToken, (req, res) => {
  ProductDataModel.findOne({ productName: req.body.productName })
    .then((existingProduct) => {
      if (existingProduct) {
        res.send(existingProduct);
      } else {
        let newProduct = new ProductDataModel(req.body);

        newProduct
          .save()
          .then((newProduct) => {
            res.send(newProduct);
          })
          .catch((err1) => {
            console.log('err product', err1);
            res.send('error while creating product');
          });
      }
    })
    .catch((err) => {
      console.log('err sign in', err);
      res.send('error while searching user sign in');
    });
});

productRouter.get('/api/getProducts', authenticateToken, (req, res) => {
  ProductDataModel.find()
    .then((allproducts) => {
      res.send(allproducts);
    })
    .catch(() => {
      res.send('error while fetching users');
    });
});

module.exports = productRouter;
