import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { withRouter } from "react-router-dom";

import Dropdown from 'react-dropdown'

import { changeUserInputSortBy, changeUrlToUserInput } from "../actions/ebayAppActions";


class SortBy extends Component {
  shouldComponentUpdate(newProps, newState) {
    let oldData = this.props.ebayAppStore;
    let newData = newProps.ebayAppStore;
    if (
      oldData.userInput.sortBy !== newData.userInput.sortBy
    ) {
      return true;
    } else {
      return false;
    }
  }

  handleSortByChange = (e) => {
    this.props.dispatch(changeUserInputSortBy(e.value))
    if (this.props.ebayAppStore.userInput.searchBoxValue !== "") {
      this.props.dispatch(changeUrlToUserInput(this.props.ebayAppStore.userInput.searchBoxValue, this.props.ebayAppStore.userInput.nameOrFoodPairOption, this.props.ebayAppStore.userInput.sortBy, this.props.ebayAppStore.userInput.maxResults, this.props.ebayAppStore.userInput.ebayDataAfterOrBefore, this.props.ebayAppStore.userInput.ebayDate, this.props.history))
    }
  }

  render() {
    return (
      <div className="sortby">
        <Dropdown
          // options={['BestMatch', 'PricePlusShippingLowest', 'PricePlusShippingHighest']}
          options={['Best Match', 'Price + Shipping: lowest first', 'Price + Shipping: highest first']}
          onChange={this.handleSortByChange}
          value={this.props.ebayAppStore.userInput.sortBy}
          placeholder="Select an option"
          ref="sortBy"
        />
      </div>
    );
  }
}

function mapStateToProps({ ebayAppStore }) {
  return { ebayAppStore };
}

export default withRouter(connect(mapStateToProps)(SortBy));
