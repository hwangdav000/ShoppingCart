import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { getReviewsFromDB } from '../../../state/Review/reviewAction'; // Import action to fetch reviews

const ProductReviewModal = ({ show, handleClose, productId }) => {
  const accessToken = useSelector((store) => store.tokenReducer.accessToken);

  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviewReducer.productReviews); // Get reviews array from Redux store

  useEffect(() => {
    if (!accessToken) {
      console.log('waiting on access token');
      return;
    }
    if (productId) {
      dispatch(getReviewsFromDB(productId, accessToken)); // Fetch reviews for the selected product
    }
  }, [dispatch, productId, accessToken]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Product Reviews</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id}>
              <p>Rating: {review.rating}</p>
              <p>Comment: {review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews found for this product.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductReviewModal;
