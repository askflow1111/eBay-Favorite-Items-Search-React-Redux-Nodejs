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
    // debugger
    if (
      this.props.ebayAppStore.fetched !== newProps.ebayAppStore.fetched ||
      this.props.ebayAppStore.userInput.sortBy !== newProps.ebayAppStore.userInput.sortBy ||
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
  // favDataFromDB


  handleFavButton = item => {
    
    console.log('item => ', item);
    if (this.props.ebayAppStore.userInfo.id === null) {
      let savedItemsObj = JSON.parse(localStorage.getItem("savedItemsObj")) || {};
      if (savedItemsObj[item.itemId[0]] === undefined) {
        savedItemsObj[item.itemId[0]] = item;
      } else if (savedItemsObj[item.itemId[0]] !== undefined) {
        delete savedItemsObj[item.itemId[0]];
      }
      localStorage.setItem("savedItemsObj", JSON.stringify(savedItemsObj));
      // this.forceUpdate();
      this.props.dispatch(updateMenu());
      this.props.dispatch(updateResults());
    } else {
      if (this.props.ebayAppStore.favDataFromDB[item.itemId[0]] === undefined) {
        this.props.dispatch(addFavItemToDB(item, this.props.ebayAppStore.userInfo.id));
      } else {
        this.props.dispatch(deleteFavItemFromDB(item.itemId[0], this.props.ebayAppStore.userInfo.id));
      }
    }
  };

  sortList = list => {
    
    if (this.props.ebayAppStore.userInput.sortBy === "Beer Name") {
      return [...list].sort((a, b) => a.name.localeCompare(b.name))
    } else if (this.props.ebayAppStore.userInput.sortBy === "First Ebay Date") {
      return ([...list].sort((a, b) => {
        a = a.first_ebay.split('/').map(Number)
        b = b.first_ebay.split('/').map(Number)
        if (a[1] > b[1]) {
          return 1;
        } else if (a[1] < b[1]) {
          return -1;
        } else if (a[1] === b[1]) {
          if (a[0] > b[0]) {
            return 1;
          } else if (a[0] < b[0]) {
            return -1;
          } else {
            return 0;
          }
        }
      }));
    } else if (this.props.ebayAppStore.userInput.sortBy === "ABV") {
      return [...list].sort((a, b) => a.abv - b.abv)
    } else {
      return list;
    }
  }

  handleMoreDetailsBttn = (item) => {
    this.props.dispatch(updateItemInfoModal(item, true));
  }




  renderList = () => {
    console.log('this.props.ebayAppStore.favDataFromDB', this.props.ebayAppStore.favDataFromDB);

    let savedItemsObj = JSON.parse(localStorage.getItem("savedItemsObj")) || {};
    if (this.props.ebayAppStore.ebayApiData.length > 0) {
      // debugger
      // return this.sortList(this.props.ebayAppStore.ebayApiData).map(item => {
      return (this.props.ebayAppStore.ebayApiData).map((item, index) => {
        // console.log('id', item.itemId[0])
    
        // debugger
    
        return (
          <li key={index} className="list">
            <div className="image-container">
              <img src={(item.galleryURL !== undefined) ? item.galleryURL[0] : "https://ir.ebaystatic.com/pictures/aw/pics/nextGenVit/imgNoImg.gif"} alt="" />
            </div>
            <div className="content-container">
              <h4 className="name">{item.title}</h4>
              <p className="description">{item.description}</p>
              <p className="first-ebay-date"><span>Price: </span>${item.sellingStatus[0].convertedCurrentPrice[0].__value__}</p>
              <p className="abv"><span>Condition: </span> {(item.condition !== undefined) ? item.condition[0].conditionDisplayName[0] : "N/A"} </p>
              <p className="abv"><span>Returns Accepted: </span> {(item.returnsAccepted !== undefined) ? ((item.returnsAccepted[0] === "true") ? "Yes" : "No") : "N/A"} </p>
              <button className="bttn more-details-bttn" onClick={() => this.handleMoreDetailsBttn(item)}>More Details</button>
              <button className="bttn more-details-bttn" onClick={() => window.open(item.viewItemURL[0])}>View on eBay</button>
              <div className={"fav-star " + ((this.props.ebayAppStore.hasFetchedFavDataFromDB && this.props.ebayAppStore.favDataFromDB[item.itemId[0]] || savedItemsObj[item.itemId[0]]) ? "fav-star-filled" : "")} onClick={() => this.handleFavButton(item)}></div>
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
    console.log('RESULTS.js ABOUT TO RENDER ');
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
