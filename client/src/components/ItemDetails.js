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
    if (this.props.ebayAppStore.showItemInfoModal) {
      let data = this.props.ebayAppStore.itemInfoForModal;
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
                  <img src={data.image_url} alt="" />
                </div>
                <div className="content-container">
                  <h4 className="name">{data.title}</h4>
                  <p><span>Price: </span> ${data.price} </p>
                  <p><span>Condition: </span>{data.condition}</p>
                  <p><span>Category: </span>{data.category}</p>
                  <p><span>Returns Accepted: </span>{data.returns_accepted}</p>
                  <button className="bttn" onClick={() => window.open(data.ebay_url)}>View on eBay</button>
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
