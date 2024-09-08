import React, { Component, Suspense, lazy } from 'react';
import './app.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
// import TestComponent from "./CommonComponent/test";
import Home from './Common/HomeComponent';
import Footer from './Common/FooterComponent';
import Header from './Common/HeaderComponent';
import About from './Common/AboutComponent';
import NotFound from './Common/NotFoundComponent';

let UserHook = lazy(() => import('./Application/User/UserHookComponent'));
let Student = lazy(() => import('./Application/Student/StudentComponent'));
let Hobby = lazy(() => import('./Application/Student/HobbyComponent'));
let Product = lazy(() => import('./Application/Product/ProductComponent'));
let Store = lazy(() => import('./Application/Shop/ShopComponent'));
let CartDetail = lazy(() => import('./Application/Cart/CartDetailComponent'));
let Coupon = lazy(() => import('./Application/Coupon/CouponComponent'));
let Order = lazy(() => import('./Application/Order/OrderComponent'));

export default class ApplicationComponent extends Component {
  //props - is the set of properties html + js which needs to be available in every component
  // also a parent component can share data to child using props
  constructor(props) {
    super(props); //syncs the props values to parent/base class

    //define the state and initialize the state
    this.state = {
      name: 'David Hwang!!!',
    };
  }

  //the parameter will be accepted here when function executes in child component
  updateName = (value) => {
    //update state to create new virtual dom using setState - api

    this.setState({
      name: value,
    });

    //evt.preventDefault()
  };

  render() {
    return (
      <Router>
        <div>
          <Suspense fallback={<div>Loading... </div>}>
            <Header userName={this.state.name} />
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    parentName1={this.state.name}
                    updateNameInParent={this.updateName}
                  />
                }
              />
              <Route
                path="home"
                element={
                  <Home
                    parentName1={this.state.name}
                    updateNameInParent={this.updateName}
                  />
                }
              />
              {/* <Route path="user" element={<UserComponent />}/> */}
              <Route
                path="user"
                element={<UserHook />}
              />
              <Route
                path="about"
                element={<About />}
              />
              <Route
                path="about/:id"
                element={<About />}
              />
              <Route
                path="hobby"
                element={<Hobby />}
              />
              <Route
                path="product"
                element={<Product />}
              />
              <Route
                path="student"
                element={<Student />}
              />
              <Route
                path="store"
                element={<Store />}
              />
              <Route
                path="cartDetail"
                element={<CartDetail />}
              />
              <Route
                path="coupon"
                element={<Coupon />}
              />
              <Route
                path="order"
                element={<Order />}
              />
              <Route
                path="*"
                element={<NotFound />}
              />
            </Routes>
            <Footer />
          </Suspense>
        </div>
      </Router>
    );
  }
}
