import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const AddStudentToStore = (student) => {
  return {
    type: actionTypes.ADD_STUDENT_TO_STORE,
    payload: student,
  };
};

export const setStudents = (students) => {
  return {
    type: actionTypes.GET_STUDENT_TO_STORE,
    payload: students,
  };
};

export const SaveStudentToDB = (newStudent) => {
  return (dispatch) => {
    axios
      .post('http://localhost:9000/student/api/signinup', newStudent)
      .then((collection) => {
        let loggedStudent = collection.data;
        dispatch(AddStudentToStore(loggedStudent));
      })
      .catch((err) => {
        console.log('error while saving', err);
      });
  };
};

export const SaveStudentToDBUsingFetch = (newStudent) => {
  return (dispatch) => {
    window
      .fetch('http://localhost:9000/student/api/signinup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudent),
      })
      .then((response) => response.json())
      .then((studentData) => {
        console.log('saving student');
        console.log(studentData);
        dispatch(AddStudentToStore(studentData));
      })
      .catch((err) => {
        console.log('error while logging in ', err);
      });
  };
};

export const getStudentsFromDB = () => {
  return (dispatch) => {
    axios
      .get('http://localhost:9000/student/api/students')
      .then((response) => {
        const students = response.data; // Assuming the response contains an array of student objects
        console.log(students);
        dispatch(setStudents(students)); // Dispatch an action to store the retrieved students
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
        // Handle error, dispatch an error action, etc.
      });
  };
};
