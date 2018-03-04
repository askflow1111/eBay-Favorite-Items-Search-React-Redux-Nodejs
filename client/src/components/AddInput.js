import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import Dropdown from 'react-dropdown'

import {
  fetchEbayApiDataFromBackend,
  changeUserInputSearchBoxValue,
  changeUserInputNameOrFoodPairValue,
  changeUserInputSortBy,
  changeShouldFetch,
  changeComingFromInput,
  changeUserInputMaxResults,
  changeUserInputebayDataAfterOrBefore,
  changeUserInputebayDate,
  changeUrlToUserInput,
} from "../actions/ebayAppActions";

class AddInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: null,
    };
  }

  shouldComponentUpdate(newProps, newState) {
    let oldData = this.props.ebayAppStore;
    let newData = newProps.ebayAppStore;
    if (
      oldData.userInput.nameOrFoodPairOption !== newData.userInput.nameOrFoodPairOption ||
      oldData.userInput.searchBoxValue !== newData.userInput.searchBoxValue ||
      oldData.userInput.maxResults !== newData.userInput.maxResults ||
      oldData.userInput.sortBy !== newData.userInput.sortBy ||
      oldData.userInput.ebayDataAfterOrBefore !== newData.userInput.ebayDataAfterOrBefore ||
      oldData.userInput.ebayDate !== newData.userInput.ebayDate ||
      this.state.focused !== newState.focused
    ) {
      return true;
    } else {
      return false;
    }
  }

  trimSpaces = value => {
    if (value.trim() === "") {
      return false;
    } else {
      value = value.trim();
      return true;
    }
  };

  shouldSubmitForm = (prevProps) => {
    // debugger
    let oldUserInput = this.props.ebayAppStore.userInput;
    let newUserInput = prevProps.ebayAppStore.userInput;
    if (
      oldUserInput.nameOrFoodPairOption !== newUserInput.nameOrFoodPairOption ||
      oldUserInput.searchBoxValue !== newUserInput.searchBoxValue ||
      oldUserInput.ebayDate !== newUserInput.ebayDate ||
      oldUserInput.sortBy !== newUserInput.sortBy
    ) {
      return true;
    }
    return false;
  }

  componentDidUpdate(prevProps) {
    this.updateURL();
    // debugger
    if (this.shouldSubmitForm(prevProps)) this.submitForm();
  }

  submitForm = () => {
    this.props.dispatch(changeShouldFetch(true));
    this.props.dispatch(changeComingFromInput(true));
    this.props.dispatch(fetchEbayApiDataFromBackend(this.refs.searchBox.value, this.props.ebayAppStore.userInput.nameOrFoodPairOption, this.props.ebayAppStore.userInput.maxResults, this.props.ebayAppStore.userInput.ebayDataAfterOrBefore, this.props.ebayAppStore.userInput.ebayDate, this.props.ebayAppStore.userInput.sortBy));

  };

  updateURL = () => {
    if (this.trimSpaces(this.props.ebayAppStore.userInput.searchBoxValue)) {
      this.props.dispatch(changeUrlToUserInput(this.props.ebayAppStore.userInput.searchBoxValue, this.props.ebayAppStore.userInput.nameOrFoodPairOption, this.props.ebayAppStore.userInput.sortBy, this.props.ebayAppStore.userInput.maxResults, this.props.ebayAppStore.userInput.ebayDataAfterOrBefore, this.props.ebayAppStore.userInput.ebayDate, this.props.history))
    };
  };

  handleRadioOptionsChange = (e) => {
    this.props.dispatch(changeUserInputNameOrFoodPairValue(e.target.value))

  }

  handleSearchBoxValue = e => {
    this.props.dispatch(changeUserInputSearchBoxValue(e.target.value));
  }

  handleOnDateChange = date => {
    date = `${(moment(date).month() + 1)}-${moment(date).year()}`;
    this.props.dispatch(changeUserInputebayDate(date))
  }

  render() {

    const horizontalLabels = {
      0: 'Low',
      40: 'Medium',
      100: 'High'
    }


    console.log('Rendering addInput.js ', this.props.ebayAppStore.userInput);
    return (
      <div className="add-input">
        <form className="form" onSubmit={(e) => {
          e.preventDefault();
          this.submitForm();
        }}>
          <div >
            <h3 className="heading"><span> Search</span></h3>
            <input
              type="text"
              id="thing"
              name="searchBox"
              required
              placeholder="Hi!"
              value={this.props.ebayAppStore.userInput.searchBoxValue}
              onChange={this.handleSearchBoxValue}
              ref="searchBox"
              className="search-box-input"
            />
            <div className="radio-bttns-group" onChange={this.handleRadioOptionsChange}>
              <div><input type="radio" value="FixedPrice" checked={this.props.ebayAppStore.userInput.nameOrFoodPairOption === "FixedPrice"} /> Search items in 'Buy Now'</div>
              <br />
              <div><input type="radio" value="Auction" checked={this.props.ebayAppStore.userInput.nameOrFoodPairOption === "Auction"} /> Search items in "Auction"</div>
            </div>
          </div>
          <div className='slider custom-labels'>
            <h3 className="heading"><span>   Max Results</span></h3>
            <Slider
              min={0}
              max={100}
              value={this.props.ebayAppStore.userInput.maxResults}
              labels={horizontalLabels}
              onChange={(e) => this.props.dispatch(changeUserInputMaxResults(e))}
              onChangeComplete={this.submitForm}
            />
            <hr />
          </div>
          <div className="date-section">
            <h3 className="heading"><span>  Date</span></h3>
            <SingleDatePicker
              id="date_input"
              onDateChange={this.handleOnDateChange}
              focused={this.state.focused}
              onFocusChange={({ focused }) => { this.setState({ focused }); }}
              isOutsideRange={() => false}
              date={(this.props.ebayAppStore.userInput.ebayDate) && moment(this.props.ebayAppStore.userInput.ebayDate, "MM-YYYY")}
              showDefaultInputIcon
              displayFormat="MMM Y"
            />
          </div>
          <button className="bttn search-form-bttn">Search</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ ebayAppStore }) {
  return { ebayAppStore };
}

export default withRouter(connect(mapStateToProps)(AddInput));
