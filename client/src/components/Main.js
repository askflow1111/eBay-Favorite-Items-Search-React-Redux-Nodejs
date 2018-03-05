import React, { Component } from "react";
import Header from "./Header";
import Results from "./Results";
import Register from "./Auth/Register";
import Profile from "./Auth/Profile";
import Login from "./Auth/Login";
import Menu from "./Menu";
import AddInput from "./AddInput";
import ItemDetails from "./ItemDetails";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateItemInfoModal, areTwoArrSame } from ".././actions/ebayAppActions";
import SortBy from "./SortBy";


class Main extends Component {
  checkTarget = e => {
    let itemDetailsModalContainer = document.querySelector(".item-details-modal-container");
    if (itemDetailsModalContainer !== null) {
      let sidebar = document.querySelector(".sidebar");
      let target = e.target;
      if (
        itemDetailsModalContainer !== target &&
        !itemDetailsModalContainer.contains(target) &&
        !sidebar.contains(target) &&
        sidebar !== target
      ) {
        this.props.dispatch(updateItemInfoModal(null, false));
      }
    }
  };

  shouldComponentUpdate(newProps, nextState) {
    if (!this.props.dispatch(areTwoArrSame(this.props.ebayAppStore.ebayApiData, newProps.ebayAppStore.ebayApiData)) || (this.props.ebayAppStore.fetched !== newProps.ebayAppStore.fetched) || (this.props.match.path !== newProps.match.path)) {
      return true;
    } {
      return false;
    }
  }

  renderResults = () => {
    if (this.props.ebayAppStore.fetched) {
      return <Results />
    } else {
      return (<h1 className="search-something">Search something!</h1>)
    }
  }


  renderResultsHeader = () => {
    return (
      <div className="results-header">
        <div className="results-count">Showing {(this.props.ebayAppStore.ebayApiData === "") ? 0 : this.props.ebayAppStore.ebayApiData.length} results</div>
        <SortBy />
      </div>
    )

  }

  renderSearchPage = () => {
    return (
      <div className="content">
        <div className="left-column">
          {this.renderResultsHeader()}
          {this.renderResults()}
        </div>
        <div className="right-column">
          <AddInput />
        </div>
      </div>
    )
  }

  renderContent = () => {
    if (this.props.match.path === "/register") {
      return (<Register />);
    } else if (this.props.match.path === "/profile") {
      return (<Profile />)
    } else if (this.props.match.path === "/login") {
      return (<Login />)
    } else {
      return (this.renderSearchPage());
    }
  }

  render() {
    return (
      <div id="outer-container" onClick={this.checkTarget}>
        <Menu />
        <ItemDetails />
        <main id="page-wrap">
          <Header />
          {this.renderContent()}
        </main>
      </div>
    );
  }
}

function mapStateToProps({ ebayAppStore }) {
  return { ebayAppStore };
}

export default withRouter(connect(mapStateToProps)(Main));
