import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  changeUserInfoId,
  changeUserInfoUsername,
  changeUserInfoEmail,
  playAuthFailedAnimation
} from "../../actions/ebayAppActions";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registrationFailed: false,
    };
  }

  shouldComponentUpdate(newProps, newState) {
    if (this.state.registrationFailed !== newState.registrationFailed) {
      return true;
    } else {
      return false;
    }
  }

  handleRegisterForm = (e) => {
    e.preventDefault();
    fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      })
    })
      .then((response) => {
        return response.json()
      })
      .then((responseJson) => {
        if (responseJson.code && responseJson.code === "23505") {
          this.setState({ registrationFailed: true });
          this.props.dispatch(playAuthFailedAnimation(this.refs.authFailed, "shake"));
        } else {
          this.props.dispatch(changeUserInfoId(responseJson.data.user.id));
          this.props.dispatch(changeUserInfoUsername(responseJson.data.user.username));
          this.props.dispatch(changeUserInfoEmail(responseJson.data.user.email));
          this.props.history.push(`/profile`);
        }
      })
  }

  render() {
    return (
      <div className="user-form-container">
        <h3 ref="authFailed" className={"auth-failed " + (this.state.registrationFailed ? "show" : "")}>Username already exists</h3>
        <div className="user-form">
          <h3>Register Your Account</h3>
          <form className="form" onSubmit={this.handleRegisterForm}>
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              name="username"
              required
              placeholder="User Name"
            />
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              required
              placeholder="Your Email"
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="Your Password"
            />
            <button>Register</button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ ebayAppStore }) {
  return { ebayAppStore };
}

export default withRouter(connect(mapStateToProps)(Register));
