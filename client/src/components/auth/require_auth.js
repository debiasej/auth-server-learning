import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {
    // The keyword static defines a class variable
    // In this case, you can use Authentication.contextTypes
    // outside this class.
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      this.checkIfAuthenticated(this.props);
    }

    componentWillUpdate(nextProps) {
      this.checkIfAuthenticated(nextProps);
    }

    checkIfAuthenticated(props){
      if (!props.authenticated)
        this.context.router.push('/');
    }

    render() {
      return <ComposedComponent { ...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}
