import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';

debugger;

const rootReducer = combineReducers({
  //{form: form} ~ {form} ES6 syntax
  form,
  auth: authReducer
});

export default rootReducer;
