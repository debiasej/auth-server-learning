import axios from 'axios';

const API_URL = 'http://localhost:3000';


export function signinUser({email, password}) {
  return function(dispatch) {
      // Submit email/password to the server using ES6 syntax to post data
      axios.post(`${API_URL}/signin`, { email, password });

  }
}

  // If request is good...
  // - Update state to indicate user is authenticated
  // - Save the JWT token
  // - Redirect to the route '/feature'

  // If request is bad
  // - Show an error to the server

// Note: react-promise is not exactly what we want beacause of
// we need to handle different side effect depending on the server response.
// Redux-thunk allows us to access to dispatcher.
