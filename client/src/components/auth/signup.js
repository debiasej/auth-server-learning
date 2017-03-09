import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  render() {
    const { handleSubmit } = this.props;
    return(
      <form>
      <fieldset className="form-group">
        <label>Email:</label>
        <Field className="form-control" name="email" component="input" type="text" />
      </fieldset>
      <fieldset className="form-group">
        <label>Password:</label>
        <Field className="form-control" name="password" component="input" type="password" />
      </fieldset>
      <fieldset className="form-group">
        <label>Confirm Password:</label>
        <Field className="form-control" name="confirmpassword" component="input" type="password" />
      </fieldset>
      <button className="btn btn-primary" action="submit">Sign up</button>
      </form>
    );
  }
}

// Decorate the form component
Signup = reduxForm({ form: 'signup' })(Signup);

// Babel fails when transpile variables using '* as ... from'
// Remove the property __esModule from actions
export default connect(null, Object.assign({}, actions))(Signup);
