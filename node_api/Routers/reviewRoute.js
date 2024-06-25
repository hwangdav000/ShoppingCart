let express = require('express');
let reviewRouter = express.Router({}); //
const { authenticateToken } = require('../Authentication/authenticate');

let ReviewDataModel = require('../DataModels/ReviewDataModel'); //this gives access to all the methods defined in mongoose to access mongo db data

reviewRouter.post('/api/saveReviews', authenticateToken, async (req, res) => {
  try {
    let reviews = req.body.reviews;
    // Save each review using Promise.all
    const savedReviews = await Promise.all(
      reviews.map((review) => {
        return ReviewDataModel.create(review); // Create a new review document for each item in the array
      })
    );

    console.log('Saved reviews:', savedReviews);

    // Respond with success message and saved reviews
    res
      .status(201)
      .json({ message: 'Reviews saved successfully', reviews: savedReviews });
  } catch (error) {
    console.error('Error saving reviews:', error);
    res.status(500).json({ error: 'Failed to save reviews' });
  }
});

reviewRouter.get('/api/getReviews', authenticateToken, (req, res) => {
  ReviewDataModel.find()
    .then((allreviews) => {
      res.send(allreviews);
    })
    .catch(() => {
      res.send('error while fetching users');
    });
});

reviewRouter.get(
  '/api/getReviews/:productId',
  authenticateToken,
  (req, res) => {
    const productId = req.params.productId;
    ReviewDataModel.find({ productId: productId })
      .then((reviews) => {
        if (reviews) {
          res.send(reviews);
        } else {
          console.log('reviews not found');
        }
      })
      .catch((err) => {
        console.log('err review', err);
        res.send('error while getting reviews');
      });
  }
);

module.exports = reviewRouter;
