import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Notification from '../Application/Notification/NotificationComponent';
import { getCartFromDB } from '../../state/Cart/cartAction';
import { useSelector, useDispatch } from 'react-redux';

let Header = (props) => {
  const accessToken = useSelector((store) => store.tokenReducer.accessToken);
  const user = useSelector((store) => store.userReducer.user);
  const usrName = user && user.userName ? user.userName : props.userName;
  const [isOpen, setIsOpen] = useState(false);

  const notifs = useSelector(
    (store) => store.notificationReducer.notifications
  );

  const dispatchToDB = useDispatch();
  useEffect(() => {
    if (!accessToken) {
      console.log('waiting on access token');
      return;
    }

    if (user._id !== '') {
      dispatchToDB(getCartFromDB(user._id, accessToken));
    }
  }, [dispatchToDB, user._id]);

  const openNotif = () => {
    setIsOpen(true);
  };

  const closeNotif = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Navbar
        bg="primary"
        data-bs-theme="dark"
        expand="md"
      >
        <Container>
          <NavLink
            to="/home"
            className="navbar-brand"
          >
            {' '}
            SynergisticIt{' '}
          </NavLink>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink
                to="/about"
                className="nav-link"
              >
                {' '}
                About{' '}
              </NavLink>
              <NavLink
                to="/user"
                className="nav-link"
              >
                User{' '}
              </NavLink>

              {user.userName === 'ADMIN' && (
                <NavLink
                  to="/product"
                  className="nav-link"
                >
                  {' '}
                  Product{' '}
                </NavLink>
              )}

              {user._id !== '' && (
                <>
                  <NavLink
                    to="/store"
                    className="nav-link"
                  >
                    {' '}
                    Store{' '}
                  </NavLink>
                  <NavLink
                    to="/coupon"
                    className="nav-link"
                  >
                    {' '}
                    Coupon{' '}
                  </NavLink>
                  <NavLink
                    to="/order"
                    className="nav-link"
                  >
                    {' '}
                    Orders{' '}
                  </NavLink>
                </>
              )}
              <Button
                onClick={() => openNotif()}
                variant="outline-light"
                className="rounded-circle"
                style={{ position: 'relative' }}
              >
                <i
                  style={{
                    width: '1.3rem',
                    height: '1.3rem',
                    paddingTop: '.3rem',
                  }}
                  className="fas fa-solid fa-bell"
                ></i>
                <div
                  style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '-0.5rem',
                    width: '1.5rem',
                    height: '1.5rem',
                    backgroundColor: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                  }}
                >
                  {notifs.length}
                </div>
              </Button>
            </Nav>

            <Navbar.Text
              className="d-none d-md-block"
              style={{ marginRight: '20px' }}
            >
              Signed in as: <a href="/user">{usrName}</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {isOpen && (
        <Notification
          isOpen={isOpen}
          closeNotif={closeNotif}
          notifs={notifs}
        />
      )}
    </>
  );
};
{
  /* <Button
                    onClick={() => openNotif()}
                    variant=""
                  >
                    <div
                      style={{
                        width: '1.3rem',
                        height: '1.3rem',
                        paddingTop: '.3rem',
                      }}
                      className="fas fa-cart-shopping fa-fw"
                    ></div>
                  </Button> */
}
export default Header;
