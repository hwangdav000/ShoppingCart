import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form } from 'react-bootstrap';
import { SaveReviewsToDB } from '../../../state/Review/reviewAction.js';
import { updateProductRating } from '../../../state/Product/productAction.js';

const ReviewModal = ({ show, handleClose, order, user }) => {
  const accessToken = useSelector((store) => store.tokenReducer.accessToken);
  const dispatch = useDispatch();
  const [reviews, setReviews] = useState([]);

  // Initialize reviews state based on the items in the order
  useEffect(() => {
    if (order) {
      const initialReviews = order.map((orderItem) => ({
        userId: user,
        productId: orderItem.productId,
        productName: orderItem.productName,
        rating: 1, // Default rating
        comment: '', // Default comment
      }));
      setReviews(initialReviews);
    }
  }, [order]);

  const handleRatingChange = (productId, value) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.productId === productId ? { ...review, rating: value } : review
      )
    );
  };

  const handleCommentChange = (productId, value) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.productId === productId ? { ...review, comment: value } : review
      )
    );
  };

  const handleSubmitReview = () => {
    let reviewJson = {
      reviews: reviews,
    };

    dispatch(SaveReviewsToDB(reviewJson, accessToken));
    handleClose();

    //update according to reviews
    reviews.forEach((review) => {
      updateRating(review.productId, review.rating);
    });
  };

  let updateRating = (productId, newRating) => {
    let productRating = {
      productId: productId,
      newRating: newRating,
    };
    dispatch(updateProductRating(productRating, accessToken));
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Review Items in Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {reviews.map((review, index) => (
          <div
            key={index}
            className="mb-3"
          >
            <h5>{review.productName}</h5>
            <Form.Group controlId={`formRating_${review.productId}`}>
              <Form.Label>Rating (1-5)</Form.Label>
              <Form.Control
                as="select"
                value={review.rating}
                onChange={(e) =>
                  handleRatingChange(review.productId, parseInt(e.target.value))
                }
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <option
                    key={value}
                    value={value}
                  >
                    {value}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId={`formComment_${review.productId}`}>
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={review.comment}
                onChange={(e) =>
                  handleCommentChange(review.productId, e.target.value)
                }
              />
            </Form.Group>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
        >
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmitReview}
        >
          Submit Review
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReviewModal;
