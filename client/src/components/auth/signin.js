import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
  onSubmit({ email, password }) {
    // Log user in
    this.props.signinUser({ email, password });
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
          <Field className="form-control" name="password" component="input" type="password" />
        </fieldset>
        {this.renderAlert()}
        <button className="btn btn-primary" action="submit">Sign in</button>
      </form>
    );
  }
}

// Decorate the form component
Signin = reduxForm({ form: 'signin' })(Signin);

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

// Babel fails when transpile variables using '* as ... from'
// Remove the property __esModule from actions
export default connect(mapStateToProps, Object.assign({}, actions))(Signin);
