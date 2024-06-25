import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AddCoupon } from '../../../state/Coupon/couponAction.js';

let Coupon = () => {
  let [randomCoupon, setRandomCoupon] = useState('');

  let dispatchCoupon = useDispatch();

  let generateCoupon = () => {
    randomCoupon = generateRandomString(6);
    setRandomCoupon(randomCoupon);
    dispatchCoupon(AddCoupon(randomCoupon));
  };

  function generateRandomString(length) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mx-auto">
            <div className="card text-center m-3">
              <div className="card-header">Generate your coupon</div>
              <div className="card-body">
                <button
                  className="btn btn-outline-dark mt-3 me-2"
                  onClick={() => generateCoupon()}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  Generate
                </button>
                {randomCoupon != '' && (
                  <>
                    <br></br>
                    <br></br>
                    <div className="form-label">
                      Your generated coupon code:
                    </div>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={randomCoupon}
                      readOnly={true}
                    />
                  </>
                )}
              </div>
              <div className="card-footer text-muted">
                Apply your coupon when checking out
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coupon;
