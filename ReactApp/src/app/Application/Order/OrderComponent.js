import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrdersFromDB } from '../../../state/Order/orderAction.js';
import { Button, Table } from 'react-bootstrap';
import OrderItemComponent from './OrderItemComponent.js';

const Order = () => {
  const accessToken = useSelector((store) => store.tokenReducer.accessToken);
  const user = useSelector((store) => store.userReducer.user);
  const lOrders = useSelector((store) => store.orderReducer.ordersList);

  const dispatchToDB = useDispatch();

  const [filter, setFilter] = useState({
    inTransit: false,
    delivered: false,
    canceled: false,
  });

  useEffect(() => {
    if (!accessToken) {
      console.log('waiting on access token');
      return;
    }

    dispatchToDB(getOrdersFromDB(user._id, accessToken));
  }, [dispatchToDB, accessToken]);

  const toggleFilter = (filterName) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [filterName]: !prevFilter[filterName],
    }));
  };

  const filteredOrders = lOrders.filter((order) => {
    if (filter.inTransit && order.status === 'IN TRANSIT') return true;
    if (filter.delivered && order.status === 'DELIVERED') return true;
    if (filter.canceled && order.status === 'CANCELED') return true;
    return !filter.inTransit && !filter.delivered && !filter.canceled; // Show all if no filters are active
  });

  return (
    <>
      <div>
        <div style={{ marginLeft: '1rem', marginTop: '1.5rem' }}>
          <Button
            variant={filter.inTransit ? 'info' : 'outline-info'}
            onClick={() => toggleFilter('inTransit')}
            style={{ marginRight: '1rem' }}
          >
            In Transit
          </Button>{' '}
          <Button
            variant={filter.delivered ? 'success' : 'outline-success'}
            onClick={() => toggleFilter('delivered')}
            style={{ marginRight: '0.5rem' }}
          >
            Delivered
          </Button>{' '}
          <Button
            variant={filter.canceled ? 'danger' : 'outline-danger'}
            onClick={() => toggleFilter('canceled')}
            style={{ marginRight: '0.5rem' }}
          >
            Canceled
          </Button>
        </div>
        <h1>Order Details</h1>
        <Table
          striped
          bordered
          hover
        >
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Order Date</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Action</th>
              <th>Review</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((item) => {
              //return item.name
              return (
                <OrderItemComponent
                  item={item}
                  key={item._id}
                />
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Order;
