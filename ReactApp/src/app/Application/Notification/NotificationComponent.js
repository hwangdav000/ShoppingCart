import React from 'react';
import { useDispatch } from 'react-redux';
import { RemoveNotification } from '../../../state/Notification/notificationAction.js';
import { useNavigate } from 'react-router-dom';
import { Offcanvas, ListGroup } from 'react-bootstrap';
const Notification = ({ isOpen, closeNotif, notifs }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNotification = (nav, index) => {
    dispatch(RemoveNotification(index));
    navigate(nav);
  };

  return (
    <Offcanvas
      placement="end"
      show={isOpen}
      onHide={closeNotif}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Notifications</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ListGroup variant="flush">
          {notifs.map((notif, index) => (
            <ListGroup.Item
              key={index}
              onClick={() => handleNotification(notif.navigate, index)}
              style={{
                cursor: 'pointer',
                fontFamily: 'Arial, sans-serif',
                fontSize: '1rem',
                fontWeight: 'bold',
                color: '#007bff', // Vibrant blue color
                backgroundColor: '#f8f9fa', // Light grey background
                marginBottom: '0.5rem',
                borderRadius: '0.25rem',
              }}
            >
              {notif.message}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Notification;
