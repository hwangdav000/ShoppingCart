let express = require('express');
let cartRouter = express.Router({}); //
const { authenticateToken } = require('../Authentication/authenticate');

let CartDataModel = require('../DataModels/CartDataModel'); //this gives access to all the methods defined in mongoose to access mongo db data

cartRouter.post('/api/savecart', authenticateToken, async (req, res) => {
  try {
    const { userId, cartItems } = req.body;

    // Find and update or create a new cart if it doesn't exist
    const updatedCart = await CartDataModel.findOneAndUpdate(
      { userId: userId },
      { cartItems: cartItems },
      { new: true, upsert: true } // upsert: true creates a new cart if one doesn't exist
    );

    console.log('Updated or created cart: ', updatedCart);
    res.status(200).json(updatedCart);
  } catch (err) {
    console.error('Error saving cart:', err);
    res.status(500).json({ error: 'Error saving cart' });
  }
});

cartRouter.get('/api/getCart/:userId', authenticateToken, (req, res) => {
  const userId = req.params.userId;

  CartDataModel.findOne({ userId: userId })
    .then((cart) => {
      if (cart) {
        console.log('Retrieved cart:', cart.cartItems);
        res.send(cart.cartItems);
      } else {
        console.log('Cart not found');
        res.send([]);
      }
    })
    .catch((err) => {
      console.error('Error while getting cart:', err);
      res.status(500).send('Error while getting cart');
    });
});
// clear cart
cartRouter.delete('/api/clearCart/:userId', authenticateToken, (req, res) => {
  const userId = req.params.userId;

  // Find the cart associated with the user ID
  CartDataModel.findOne({ userId: userId })
    .then((cart) => {
      if (cart) {
        // Clear the cartItems array
        cart.cartItems = [];

        // Save the updated cart
        cart
          .save()
          .then((updatedCart) => {
            res.send(updatedCart);
          })
          .catch((err) => {
            console.log('Error clearing cart:', err);
            res.status(500).send('Error clearing cart');
          });
      } else {
        console.log('Cart not found for user:', userId);
        res.status(404).send('Cart not found');
      }
    })
    .catch((err) => {
      console.log('Error finding cart:', err);
      res.status(500).send('Error finding cart');
    });
});

module.exports = cartRouter;
