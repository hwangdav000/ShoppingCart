import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CancelOrderToDB,
  DeliverOrderToDB,
  SaveOrderToDB,
} from '../../../state/Order/orderAction.js';
import { AddNotification } from '../../../state/Notification/notificationAction.js';
import { Button } from 'react-bootstrap';
import ReviewModal from './OrderReviewModal';

const OrderItemComponent = (props) => {
  const accessToken = useSelector((store) => store.tokenReducer.accessToken);
  const { item } = props;

  const [delivered, setDelivered] = useState(false);
  const [formattedOrderDate, setFormattedOrderDate] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);

  const dispatchToDB = useDispatch();

  // Calculate if 2 days have passed since the order date
  useEffect(() => {
    if (!accessToken) {
      // If accessToken is not available, do not proceed further
      console.log('Access token not available');
      return;
    }

    const orderDate = new Date(item.orderDate);
    const currentDate = new Date();
    const timeDifference = currentDate - orderDate;
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    if (daysDifference >= 2) {
      setDelivered(true);
      if (item.status !== 'DELIVERED' && item.status !== 'CANCELED') {
        dispatchToDB(DeliverOrderToDB(item._id, item.userId, accessToken));
      }
    }

    // Format order date
    const formattedDate = orderDate.toLocaleDateString('en-GB'); // Adjust locale as needed
    setFormattedOrderDate(formattedDate);
  }, [dispatchToDB, item, accessToken]);

  const handleCancel = () => {
    let cancelNotif = {
      message: 'User has canceled order ' + item._id,
      navigate: '/order',
    };
    dispatchToDB(CancelOrderToDB(item._id, item.userId, accessToken));
    dispatchToDB(AddNotification(cancelNotif));
  };

  const handleReorder = () => {
    const currentDate = new Date();

    let newOrder = {
      userId: item.userId,
      status: 'IN TRANSIT',
      orderDate: currentDate,
      price: item.price,
      userName: item.userName,
      order: item.order,
    };

    dispatchToDB(SaveOrderToDB(newOrder, accessToken));
    alert('Reordered successfully');
  };

  const handleReview = () => {
    setShowReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
  };

  return (
    <tr>
      <td>{item._id}</td>
      <td>{formattedOrderDate}</td>
      <td>{item.price}</td>
      <td>{item.status}</td>
      <td>
        {delivered || item.status === 'CANCELED' ? (
          <Button
            onClick={handleReorder}
            variant="primary"
          >
            Reorder
          </Button>
        ) : (
          <Button
            onClick={handleCancel}
            variant="danger"
          >
            Cancel
          </Button>
        )}
      </td>
      <td>
        {item.status === 'DELIVERED' && (
          <>
            <Button
              onClick={handleReview}
              variant="info"
            >
              Review
            </Button>
            <ReviewModal
              show={showReviewModal}
              handleClose={handleCloseReviewModal}
              order={item.order} // Pass the items of the order to the modal
              user={item.userId}
            />
          </>
        )}
      </td>
    </tr>
  );
};

export default OrderItemComponent;
