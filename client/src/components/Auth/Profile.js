import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  changeUserInfoId,
  changeUserInfoUsername,
  changeUserInfoEmail
} from "../../actions/ebayAppActions";

class Profile extends Component {
  shouldComponentUpdate(newProps, newState) {
    return false;
  }

  componentDidMount() {
    if (this.props.ebayAppStore.userInfo.id === null) {
      this.props.history.push(`/login`);
    }
  }

  render() {
    console.log('this.props form profile => ', this.props);
    return (
      <div className="user-form-container">
        <div className="user-form profile">
          <h3>My Profile</h3>
          <table className="table table-user-information">
            <tbody>
              <tr><td>User Name:</td><td>{this.props.ebayAppStore.userInfo.username}</td>
              </tr>
              <tr>
                <td>Email:</td><td><a href={"mailto:" + this.props.ebayAppStore.userInfo.email}>{this.props.ebayAppStore.userInfo.email}</a></td>
              </tr>
            </tbody>
          </table>
          <footer>Your Profile Information</footer>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ ebayAppStore }) {
  return { ebayAppStore };
}

export default withRouter(connect(mapStateToProps)(Profile));
