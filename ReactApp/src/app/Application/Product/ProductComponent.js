import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  SaveProductToDBUsingFetch,
  getProductsFromDB,
} from '../../../state/Product/productAction';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

let Product = (props) => {
  const accessToken = useSelector((store) => store.tokenReducer.accessToken);

  let ProductList = useSelector((state) => state.productReducer.productList);
  const user = useSelector((store) => store.userReducer.user);

  let productName = useRef('');
  let price = useRef(0);
  let desc = useRef('');
  let picURL = useRef('');

  const [showProducts, setShowProducts] = useState(false);

  let dispatchToDB = useDispatch();

  const handleButtonClick = () => {
    dispatchToDB(getProductsFromDB(accessToken));
    setShowProducts(true);
  };

  let saveProduct = (evt) => {
    let newProduct = {
      productName: productName.current.value,
      price: price.current.value,
      desc: desc.current.value,
      picURL: picURL.current.value,
    };

    dispatchToDB(SaveProductToDBUsingFetch(newProduct, accessToken));

    productName.current.value = '';
    price.current.value = '';
    desc.current.value = '';
    picURL.current.value = '';

    evt.preventDefault();
  };

  return (
    <>
      <Container className="componentClass">
        <h1>Save Product Page</h1>
        <Form className="col-md-8">
          <Form.Group
            as={Row}
            className="mb-3"
          >
            <Form.Label
              column
              sm={2}
            >
              <b>Product Name:</b>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                ref={productName}
                placeholder="Please enter product name"
                maxLength={40}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
          >
            <Form.Label
              column
              sm={2}
            >
              <b>Price:</b>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="number"
                ref={price}
                placeholder="Please enter price"
                maxLength={20}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
          >
            <Form.Label
              column
              sm={2}
            >
              <b>Description:</b>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                ref={desc}
                placeholder="Please enter description"
                maxLength={40}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
          >
            <Form.Label
              column
              sm={2}
            >
              <b>Picture URL:</b>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                ref={picURL}
                placeholder="Please enter picture URL"
                maxLength={150}
                required
              />
            </Col>
          </Form.Group>
          {user.userName === 'ADMIN' && (
            <Button
              variant="primary"
              onClick={saveProduct}
              className="col-md-2 button-one-line"
            >
              Save Product
            </Button>
          )}
        </Form>
      </Container>

      <Container className="componentClass">
        <h1>Get all Products</h1>
        <Form className="col-md-8">
          <Button
            variant="primary"
            style={{ whiteSpace: 'nowrap', width: 'auto' }}
            onClick={handleButtonClick}
            className="col-md-2 button-one-line"
          >
            View All Products
          </Button>
        </Form>

        {showProducts && (
          <ul>
            {ProductList.map((productItem, index) => (
              <li key={index}>{productItem.productName}</li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
};

export default Product;
