import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import excel from '../../images/excel.png';
import m365 from '../../images/m365.png';
import office from '../../images/office.png';
import powerpoint from '../../images/powerpoint.png';
import ProductReviewModal from '../Product/ProductReviewModal';

const StoreItem = (props) => {
  const {
    _id,
    productName,
    price,
    desc,
    rating,
    picURL,
    addToCart,
    subtractToCart,
    initQuantity,
  } = props;

  const [quantity, setQuantity] = useState(initQuantity);
  const [showReviewModal, setShowReviewModal] = useState(false); // State to manage review modal visibility

  const addToItem = (evt) => {
    evt.preventDefault();
    const success = addToCart(productName, _id, price);
    if (success !== -1) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const subtractToItem = (evt) => {
    evt.preventDefault();
    if (quantity > 0) {
      subtractToCart(productName);
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const openReviewModal = () => {
    setShowReviewModal(true);
  };

  const renderStars = () => {
    const stars = [];
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    if (rating === 0) {
      return <div className="stars-container">No Ratings</div>;
    }

    // Full stars using react icons
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <i
          key={`full-${i}`}
          className="bi bi-star-fill text-warning"
        ></i>
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <i
          key="half"
          className="bi bi-star-half text-warning"
        ></i>
      );
    }

    // Empty stars
    const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <i
          key={`empty-${i}`}
          className="bi bi-star text-warning"
        ></i>
      );
    }

    return (
      <div
        className="stars-container"
        onClick={openReviewModal}
      >
        {stars}
      </div>
    );
  };

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={picURL}
        height="200px"
        style={{ objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between mb-3 align-items-start">
          <div>
            <span className="fs-2">{productName}</span>
            <div className="text-right">
              <div className="mt-1">Rating: {renderStars()}</div>
              {/* Product Review Modal */}
              {showReviewModal && (
                <ProductReviewModal
                  show={showReviewModal}
                  handleClose={() => setShowReviewModal(false)}
                  productId={_id} // Pass the product ID to fetch reviews for this product
                />
              )}
            </div>
            <span className="text-muted">Price: ${price}</span>
            <br />
            <span className="text-muted">Desc: {desc}</span>
          </div>
        </div>
        <div className="text-center mt-auto">
          {quantity === 0 ? (
            <Button onClick={addToItem}>+ Add to Cart</Button>
          ) : (
            <div className="d-flex align-items-center justify-content-center">
              <Button onClick={subtractToItem}>-</Button>
              <div>
                <span className="fs-3">{quantity}</span> In cart
              </div>
              <Button onClick={addToItem}>+</Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreItem;
