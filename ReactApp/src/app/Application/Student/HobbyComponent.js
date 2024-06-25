import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  SaveHobbiesToDBUsingFetch,
  getHobbiesFromDB,
} from '../../../state/User/userAction';

//a functional component using arrow function
let Hobby = () => {
  let username = useSelector((store) => store.userReducer.user.userName);
  let HobbiesList = useSelector((store) => store.userReducer.user.hobbies);

  let [hobby, setHobby] = useState('');

  // make component as publisher for data back to store
  let dispatchToDB = useDispatch();

  // Function to handle button click
  let addHobby = (evt) => {
    evt.preventDefault();
    // Dispatch action to fetch students from API
    if (hobby == '') {
      return;
    }
    console.log('hobby List ' + HobbiesList);
    console.log('hobby ' + hobby);

    let updatedHobbiesList = [...HobbiesList, hobby];

    let user = {
      userName: username,
      hobbies: updatedHobbiesList,
    };

    dispatchToDB(SaveHobbiesToDBUsingFetch(user));

    setHobby('');
  };

  useEffect(() => {
    console.log('Re render happened');

    return () => {
      console.log('Makes use effect to work for componentWillUnmount');
    };
  }, []);

  return (
    <>
      <section className={'componentClass'}>
        <div className="form col-md-8">
          <div className="col-md-12">
            <b>Add Hobby: </b>
            <input
              type="text"
              className="form-control col-md-6 pass"
              value={hobby}
              placeholder="hobby"
              onChange={(evt) => setHobby(evt.target.value)}
              maxLength={40}
            />
          </div>
          <input
            type="button"
            className={'btn btn-primary col-md-2 saveUser'}
            value={'Add Hobby'}
            onClick={addHobby}
          />

          <br></br>
          <br></br>
          <h1>Hobbies List for User: {username}</h1>

          {HobbiesList && (
            <ul>
              {HobbiesList.map((hobbyItem, index) => (
                <li key={index}>{hobbyItem}</li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
};

export default Hobby;
