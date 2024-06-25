import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  SaveUserToDB,
  SaveUserToDBUsingFetch,
  LoginUserDB,
} from '../../../state/User/userAction';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// useState - to create state for each option
// useRef - initialize with store/reducer data and then allow to update

const UserHook = (props) => {
  let [uName, setUserName] = useState('');
  let [pass, setPassword] = useState('');
  let [street, setStreet] = useState('');
  let [mobile, setPhone] = useState('');

  const loginState = useSelector((store) => store.userReducer.login);

  let dispatchToDB = useDispatch();
  const navigate = useNavigate();

  const onTextChange = (evt) => {
    setUserName(evt.target.value);
    evt.preventDefault();
  };

  const signUpUser = (evt) => {
    evt.preventDefault();
    let newUser = {
      userName: uName,
      password: pass,
      street,
      mobile,
    };
    dispatchToDB(SaveUserToDBUsingFetch(newUser));

    alert('user has signed up');
  };

  const loginUser = (evt) => {
    evt.preventDefault();

    let user = {
      userName: sessionName.current.value,
      password: sessionPassword.current.value,
    };

    dispatchToDB(LoginUserDB(user));
    console.log('login state', loginState);
  };

  let sessionName = useRef(null);
  let sessionPassword = useRef(null);

  useEffect(() => {
    console.log('in use effect');
    if (loginState) {
      console.log('going to navigate');
      navigate('/home');
    }

    return () => {
      console.log('Component will unmount');
      dispatchToDB({ type: 'STORE.RESETLOGIN' });
    };
  }, [navigate, loginState]);

  const readFormData = (evt) => {
    alert(sessionName.current.value);
    evt.preventDefault();
  };

  return (
    <>
      <Container className="componentClass">
        <h1>User Login Page</h1>
        <Form className="col-md-8">
          <Form.Group
            as={Row}
            className="mb-3"
          >
            <Form.Label
              column
              sm={2}
            >
              <b>User Name:</b>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                value={uName}
                placeholder="User Name"
                onChange={onTextChange}
                maxLength={40}
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
              <b>Password:</b>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="password"
                value={pass}
                placeholder="Password"
                onChange={(evt) => setPassword(evt.target.value)}
                maxLength={40}
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
              <b>Street:</b>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                value={street}
                placeholder="Street Name"
                onChange={(evt) => setStreet(evt.target.value)}
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
              <b>Mobile:</b>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="number"
                value={mobile}
                placeholder="Mobile"
                maxLength={11}
                onChange={(evt) => setPhone(evt.target.value)}
              />
            </Col>
          </Form.Group>

          <Button
            variant="primary"
            onClick={signUpUser}
            className="col-md-2 button-one-line"
          >
            Sign Up
          </Button>
        </Form>
      </Container>

      <Container className="componentClass login">
        <Form
          className="form col-md-10 userHook"
          onSubmit={readFormData}
        >
          <Form.Group
            as={Row}
            className="mb-3"
          >
            <Form.Label
              column
              sm={2}
            >
              <b>User Name:</b>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                ref={sessionName}
                placeholder="Please enter user name"
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
              <b>Password:</b>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="password"
                ref={sessionPassword}
                placeholder="Please enter password"
                maxLength={20}
                required
              />
            </Col>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            onClick={loginUser}
            className="col-md-2 button-one-line"
          >
            Login
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default UserHook;
