/* eslint-disable react/no-unused-state */
/* eslint-disable no-param-reassign */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { produce } from 'immer';
import { NavLink } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { signinUser } from '../../actions';
import withRouter from '../withRouter';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  saveEmail = (event) => {
    this.setState(
      produce((draftstate) => {
        { draftstate.email = event.target.value; }
      }),
    );
  };

  savePassword = (event) => {
    this.setState(
      produce((draftstate) => {
        { draftstate.password = event.target.value; }
      }),
    );
  };

  signIn = (event) => {
    const signInInfo = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.signinUser(signInInfo, this.props.navigate);
  };

  render() {
    return (
      <div className="account-form">
        <form id="createPost">
          <h1 className="form-header" id="title">Welcome Back</h1>

          <div className="form-interval">
            <label className="form-label em-w">
              Email
              <input className="form-control input-field"
                type="text"
                onChange={this.saveEmail}
                autoComplete="off"
                placeholder="Enter email"
              />
            </label>
          </div>

          <div>
            <label className="form-label em-w">
              Password
              <input className="form-control input-field password-input"
                type="text"
                onChange={this.savePassword}
                autoComplete="off"
                placeholder="Enter password"
              />
            </label>
          </div>

          <input type="button" value="Sign In" className="sign-but" onClick={this.signIn} />
          <p className="account-info">Don&apos;t have an account?
            <NavLink className="hyper-sign" to="/signup">  Sign up</NavLink>
          </p>
        </form>
      </div>
    );
  }
}

export default withRouter(connect(null, { signinUser })(SignIn));
