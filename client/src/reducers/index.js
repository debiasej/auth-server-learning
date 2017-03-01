import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
  //{form: form} ~ {form} ES6 syntax
  form
});

export default rootReducer;
