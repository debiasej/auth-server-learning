import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';

const API_URL = 'http://localhost:3000';

export function signinUser({email, password}) {
  return function(dispatch) {
      // Submit email/password to the server using ES6 syntax to post data
      axios.post(`${API_URL}/signin`, { email, password })
        .then(response => {
          // If request is good...
          // - Update state to indicate user is authenticated
          dispatch({ type: AUTH_USER });
          // - Save the JWT token
          localStorage.setItem('token', response.data.token);
          // - Redirect to the route '/feature'
          browserHistory.push('/feature');
        })
        .catch( () => {
          // If request is bad
          // - Show an error to the server
          dispatch(authError('Incorrect credentials'));
        });
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER }
}

// Note: react-promise is not exactly what we want beacause of
// we need to handle different side effect depending on the server response.
// Redux-thunk allows us to access to dispatcher.
