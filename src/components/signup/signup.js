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
import { signupUser } from '../../actions';
import withRouter from '../withRouter';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      password: '',
    };
  }

  saveName = (event) => {
    this.setState(
      produce((draftstate) => {
        { draftstate.userName = event.target.value; }
      }),
    );
  };

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

  signUp = (event) => {
    const signUpInfo = {
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password,
    };
    this.props.signupUser(signUpInfo, this.props.navigate);
  };

  render() {
    return (
      <div className="account-form">
        <form id="createPost">
          <h1 className="form-header" id="title">Create a New Account!</h1>

          <div className="form-interval">
            <label className="form-label em-w">
              Name
              <input className="form-control input-field"
                type="text"
                autoComplete="off"
                placeholder="Enter name"
                onChange={this.saveName}
              />
            </label>
          </div>

          <div className="form-interval">
            <label className="form-label em-w">
              Email
              <input className="form-control input-field"
                autoComplete="off"
                placeholder="Enter email"
                type="text"
                onChange={this.saveEmail}
              />
            </label>
          </div>

          <div className="form-interval">
            <label className="form-label em-w">
              Password
              <input className="form-control input-field"
                autoComplete="off"
                placeholder="Enter password"
                type="text"
                onChange={this.savePassword}
              />
            </label>
          </div>

          <input type="button" value="Sign Up!" className="sign-but" onClick={this.signUp} />
          <p className="account-info">Already Have an Account?
            <NavLink className="hyper-sign" to="/signin">  Sign in</NavLink>
          </p>
        </form>
      </div>

    );
  }
}

export default withRouter(connect(null, { signupUser })(SignUp));
