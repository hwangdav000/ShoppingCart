import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  SaveStudentToDBUsingFetch,
  SaveUserToDB,
  getStudentsFromDB,
} from '../../../state/Student/studentAction';

let Student = (props) => {
  let Student = useSelector((store) => store.studentReducer.student);
  let StudentList = useSelector((state) => state.studentReducer.studentList);

  // initalize state and return callback to update state
  let [studentName, setStudentName] = useState(Student.studentName);
  let [age, setAge] = useState(Student.age);
  let [address, setAddress] = useState(Student.address);
  let [mobile, setMobile] = useState(Student.mobile);

  // State to track whether the button is clicked
  const [showStudents, setShowStudents] = useState(false);

  let sessionName = useRef('');

  // make component as publisher for data back to store
  let dispatchToDB = useDispatch();

  // Function to handle button click
  const handleButtonClick = () => {
    // Dispatch action to fetch students from API
    dispatchToDB(getStudentsFromDB());
    // Update state to show students list
    setShowStudents(true);
  };

  let saveStudent = (evt) => {
    let newStudent = {
      studentName,
      age,
      address,
      mobile,
    };
    dispatchToDB(SaveStudentToDBUsingFetch(newStudent));

    sessionName.current = studentName;
    evt.preventDefault();
  };

  useEffect(() => {
    console.log('Re render happened');
    if (sessionName.current) {
    }
    return () => {
      console.log('Makes use effect to work for componentWillUnmount');
    };
  }, []);

  return (
    <>
      <section className={'componentClass'}>
        <h1>Student Sign Up {sessionName.current}</h1>
        <div className="form col-md-8">
          <div className="col-md-12">
            <b>Name: </b>
            <input
              type="text"
              className="form-control col-md-6 studentName"
              value={studentName} //state to update the userName
              placeholder="Student Name"
              onChange={(evt) => setStudentName(evt.target.value)}
              maxLength={40}
            />
          </div>
          <div className="col-md-12">
            <b>Age: </b>
            <input
              type="number"
              className="form-control col-md-6 age"
              value={age} //state to update the userName
              placeholder="Age"
              onChange={(evt) => setAge(evt.target.value)}
              maxLength={40}
            />
          </div>
          <div className="col-md-12">
            <b>Address: </b>
            <input
              type="text"
              className="form-control col-md-6 address"
              value={address} //state to update the userName
              placeholder="Address"
              onChange={(evt) => setAddress(evt.target.value)}
              maxLength={40}
            />
          </div>
          <div className="col-md-12">
            <b>Mobile: </b>
            <input
              type="number"
              className="form-control col-md-6 mobile"
              value={mobile} //state to update the userName
              placeholder="Mobile"
              onChange={(evt) => setMobile(evt.target.value)}
              maxLength={40}
            />
          </div>

          <input
            type="button"
            className={'btn btn-primary col-md-2 saveStudent'}
            value={'Sign Up'}
            onClick={saveStudent}
          />
        </div>
      </section>
      <section className={'componentClass'}>
        <h1>Get all Students</h1>
        <div className="form col-md-8">
          <input
            type="button"
            className={'btn btn-primary col-md-2 getStudent'}
            value={'get Students'}
            onClick={handleButtonClick}
          />
        </div>
        {showStudents && (
          <ul>
            {StudentList.map((student, index) => (
              <li key={index}>{student.studentName}</li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
};

export default Student;

// studentName : "student",
// age : 20,
// Address : "somewhere on earth",
// mobile : 1112223333
