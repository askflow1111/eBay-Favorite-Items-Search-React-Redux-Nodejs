import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updateMenu,
  updateResults,
  areTwoArrSame,
  updateItemInfoModal,
  addFavItemToDB,
  deleteFavItemFromDB
} from ".././actions/ebayAppActions";
import FlipMove from 'react-flip-move';

class Results extends Component {

  shouldComponentUpdate(newProps, newState) {
    if (
      this.props.ebayAppStore.fetched !== newProps.ebayAppStore.fetched ||
      this.props.ebayAppStore.ebayApiData !== newProps.ebayAppStore.ebayApiData ||
      this.props.ebayAppStore.updateResults !== newProps.ebayAppStore.updateResults ||
      JSON.stringify(this.props.ebayAppStore.favDataFromDB) !== JSON.stringify(newProps.ebayAppStore.favDataFromDB) ||
      !this.props.dispatch(areTwoArrSame(this.props.ebayAppStore.ebayApiData, newProps.ebayAppStore.ebayApiData))
    ) {
      return true;
    } else {
      return false;
    }
  }

  handleFavButton = item => {
    if (this.props.ebayAppStore.userInfo.id === null) {
      let savedItemsObj = JSON.parse(localStorage.getItem("savedItemsObj")) || {};
      if (savedItemsObj[item.item_id] === undefined) {
        savedItemsObj[item.item_id] = item;
      } else if (savedItemsObj[item.item_id] !== undefined) {
        delete savedItemsObj[item.item_id];
      }
      localStorage.setItem("savedItemsObj", JSON.stringify(savedItemsObj));
      // this.forceUpdate();
      this.props.dispatch(updateMenu());
      this.props.dispatch(updateResults());
    } else {
      if (this.props.ebayAppStore.favDataFromDB[item.item_id] === undefined) {
        this.props.dispatch(addFavItemToDB(item, this.props.ebayAppStore.userInfo.id));
      } else {
        this.props.dispatch(deleteFavItemFromDB(item.item_id, this.props.ebayAppStore.userInfo.id));
      }
    }
  };

  handleMoreDetailsBttn = (item) => {
    this.props.dispatch(updateItemInfoModal(item, true));
  }

  renderList = () => {
    let savedItemsObj = (this.props.ebayAppStore.hasFetchedFavDataFromDB && this.props.ebayAppStore.favDataFromDB) || (JSON.parse(localStorage.getItem("savedItemsObj"))) || {};
    if (this.props.ebayAppStore.ebayApiData.length > 0) {
      return (this.props.ebayAppStore.ebayApiData).map((item, index) => {

        return (
          <li key={item.item_id} className="list">
            <div className="image-container">
              <img src={item.image_url} alt="" />
            </div>
            <div className="content-container">
              <h4 className="name">{item.title}</h4>
              <p ><span>Price: </span>${item.price}</p>
              <p ><span>Condition: </span> {item.condition} </p>
              <p><span>Returns Accepted: </span> {item.returns_accepted} </p>
              <button className="bttn more-details-bttn" onClick={() => this.handleMoreDetailsBttn(item)}>More Details</button>
              <button className="bttn more-details-bttn" onClick={() => window.open(item.ebay_url)}>View on eBay</button>
              <div className={"fav-star " + ((savedItemsObj[item.item_id]) ? "fav-star-filled" : "")} onClick={() => this.handleFavButton(item)}></div>
            </div>
          </li>
        );
      });
    } else {
      return <h1>Nothing was found</h1>
    }
  };

  renderLoading = () => {
    return <h1 className="loading">Loading</h1>
  }

  render() {
    return (
      <div className="results">
        {(!this.props.ebayAppStore.fetched) ? this.renderLoading() : (
          <ul>
            <FlipMove className="flip-move" >
              {this.renderList()}
            </FlipMove>
          </ul>)}
      </div>
    );
  }
}

function mapStateToProps({ ebayAppStore }) {
  return { ebayAppStore };
}

export default connect(mapStateToProps)(Results);
