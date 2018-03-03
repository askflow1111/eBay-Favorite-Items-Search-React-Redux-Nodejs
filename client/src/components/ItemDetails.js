import React, { Component } from "react";
import { connect } from "react-redux";
import { updateItemInfoModal } from ".././actions/ebayAppActions";
import closeBttnImg from ".././images/closeBttnImg.png";


class ItemDetails extends Component {
  shouldComponentUpdate(newProps, newState) {
    if (
      this.props.ebayAppStore.itemInfoForModal !== newProps.ebayAppStore.itemInfoForModal ||
      this.props.ebayAppStore.isSideBarOpen !== newProps.ebayAppStore.isSideBarOpen ||
      this.props.ebayAppStore.showItemInfoModal !== newProps.ebayAppStore.showItemInfoModal
    ) {
      return true;
    } else {
      return false;
    }
  }

  closeItemInfoModal = () => {
    this.props.dispatch(updateItemInfoModal(null, false));
  };

  render() {
    console.log('this.props.ebayAppStore.isSideBarOpen ', this.props.ebayAppStore.isSideBarOpen);

    if (this.props.ebayAppStore.showItemInfoModal) {
      console.log("this.props.ebayAppStore.itemInfoForModal => ", this.props.ebayAppStore.itemInfoForModal)
      let data = this.props.ebayAppStore.itemInfoForModal;
      // debugger
      // let foodPairing = data.food_pairing.join(', ')
      return (
        <div className="item-details-modal-main">
          <div className={"item-details-modal-container " + (!this.props.ebayAppStore.isSideBarOpen ? 'sidebar-closed' : '')}>
            <img
              className="close-bttn-img"
              src={closeBttnImg}
              alt="Close Button"
              onClick={this.closeItemInfoModal}
            />
            <ul>

              <li key={data.id} className="list">
                <div className="image-container">
                  <img src={data.galleryURL[0]} alt="" />
                </div>
                <div className="content-container">
                  <h4 className="name">{data.title}</h4>
                  {/* <p className="description"><span>Description: </span>{data.description}</p>
                  <p className="first-ebay-date"><span>First Ebay Date: </span>{data.first_ebay}</p>
                  <p className="abv"><span>ABV: </span> {data.abv} </p>
                  <p className="volume"><span>Volume: </span> {data.volume.value || data.volumeValue} {data.volume.unit || data.volumeUnit}</p>
                  <p className="food-pairing"><span>Food Pairing: </span> asdas</p> */}
                </div>
              </li>
            </ul>




          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

function mapStateToProps({ ebayAppStore }) {
  return { ebayAppStore };
}

export default connect(mapStateToProps)(ItemDetails);
