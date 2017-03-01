import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class Signin extends Component {
  onSubmit({ email, password }) {
    console.log(email, password);
    // Log user in
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <Field className="form-control" name="email" component="input" type="text" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field className="form-control" name="password" component="input" type="text" />
        </fieldset>
        <button className="btn btn-primary" action="submit">Sign in</button>
      </form>
    );
  }
}

// Decorate the form component
export default reduxForm({
  form: 'signin'
})(Signin);
