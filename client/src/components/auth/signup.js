import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit(formProps) {
    // Call action creator to sign up the user
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
           <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  renderField = ({ input, label, type, meta: { touched, error } }) => (
      <fieldset className="form-group">
        <label>{label}</label>
        <input className="form-control" {...input} placeholder={label} type={type}/>
        {touched && (error && <div className="error">{error}</div>)}
      </fieldset>
    );

  render() {
    const { handleSubmit } = this.props;

    return(
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field name="email" type="text" label="Email:" component={this.renderField} />
        <Field name="password" type="password" label="Password:" component={this.renderField} />
        <Field name="confirmpassword" type="password" label="Confirm Password:" component={this.renderField} />
        {this.renderAlert()}
        <button className="btn btn-primary" action="submit">Sign up</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter a email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.confirmpassword) {
    errors.confirmpassword = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.confirmpassword) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

// Decorate the form component
Signup = reduxForm({
  form: 'signup',
  validate
 })(Signup);

 function mapStateToProps(state) {
   return { errorMessage: state.auth.error };
 }

// Babel fails when transpile variables using '* as ... from'
// Remove the property __esModule from actions
export default connect(mapStateToProps, Object.assign({}, actions))(Signup);
