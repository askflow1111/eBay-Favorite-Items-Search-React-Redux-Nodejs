export function fetchEbayApiDataFromBackend(searchBoxValue, listingType, maxResults, ebayDataAfterOrBefore, listingEndTime, sortBy) {
  if (sortBy === "Price + Shipping: highest first") {
    sortBy = "PricePlusShippingHighest";
  } else if (sortBy === "Price + Shipping: lowest first") {
    sortBy = "PricePlusShippingLowest";
  } else if (sortBy === "Best Match") {
    sortBy = "BestMatch";
  }
  if (listingEndTime !== null) {
    listingEndTime = listingEndTime.split('-');
    listingEndTime = `${listingEndTime[2]}-${listingEndTime[0]}-${listingEndTime[1]}T23:59:59.999Z`
  }  
  return function (dispatch) {
    fetch('/ebayApi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({
        search: searchBoxValue,
        maxResults,
        listingType,
        sortBy,
        listingEndTime,
      }),
    })
      .then(res => res.json())
      .then((responseJson) => {

        if (responseJson["@count"] == 0) {
          dispatch({ type: "FETCH_EBAYAPI_REJECTED", payload: null });
        } else {
          let data = fixEbayApiData(responseJson.item);
          dispatch({
            type: "FETCH_EBAYAPI_FULFILLED",
            payload: {
              ebayApiData: data,
            },
          });
        }
      })
      .catch(err => {
        dispatch({ type: "FETCH_EBAYAPI_REJECTED", payload: err });
      });
  };
}

function fixEbayApiData(items) {
  items.forEach(item => {
    item.image_url = (item.pictureURLSuperSize) || (item.pictureURLLarge) || (item.galleryURL) || ("https://ir.ebaystatic.com/pictures/aw/pics/nextGenVit/imgNoImg.gif");
    item.condition = (item.condition !== undefined) ? item.condition[0].conditionDisplayName[0] : "N/A"
    item.returns_accepted = (item.returnsAccepted !== undefined) ? ((item.returnsAccepted[0] === "true") ? "Yes" : "No") : "N/A";
    item.item_id = item.itemId;
    item.ebay_url = item.viewItemURL[0];
    item.price = item.sellingStatus[0].convertedCurrentPrice[0].__value__;
    item.category = item.primaryCategory[0].categoryName[0];
  });
  return items;
}

export function transferDataFromLocalStorageToDB(userId) {
  return function (dispatch) {
    let favLocalStorageItems = JSON.parse(localStorage.getItem("savedItemsObj"));
    for (let key in favLocalStorageItems) {
      dispatch(addFavItemToDB(favLocalStorageItems[key], userId));
    }
    localStorage.setItem("savedItemsObj", null);
  };
}

export function fetchFavDataFromDatabase(userId) {
  return function (dispatch) {
    fetch('/fav/show', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({
        user_id: userId,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        dispatch({ type: "FETCH_FAV_DATA_FROM_DATABASE_FULFILLED", payload: responseJson.data.data });
      })
  };
}


export function addFavItemToDB(item, userId) {
  return function (dispatch) {
    fetch('/fav/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({
        item_id: item.item_id,
        user_id: userId,
        title: item.title,
        image_url: item.image_url,
        price: item.price,
        condition: item.condition,
        returns_accepted: item.returns_accepted,
        ebay_url: item.ebay_url,
        category: item.category,
      }),
    })
      .then(res => res.json())
      .then((responseJson) => {
        dispatch({ type: "ADD_FAV_ITEM_TO_DB_FULFILLED", payload: responseJson.data.data });
      })
  };
}

export function deleteFavItemFromDB(item_id, userId) {
  return function (dispatch) {
    fetch('/fav/destroy', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({
        item_id: item_id,
        user_id: userId,
      }),
    })
      .then(res => res.json())
      .then((responseJson) => {
        dispatch({ type: "DELETE_FAV_ITEM_FROM_DB_FULFILLED", payload: item_id });
      })
  };
}

export function areTwoArrSame(arrOne, arrTwo) {
  return function () {
    if (arrOne.length !== arrTwo.length) {
      return false;
    }
    for (let i = 0; i < arrOne.length; i++) {
      if (JSON.stringify(arrOne[i]) !== JSON.stringify(arrTwo[i]))
        return false;
    }
    return true;
  };
}

export function changeUrlToUserInput(searchBoxValue, listingType, sortBy, maxResults, ebayDataAfterOrBefore, listingEndTime, history) {
  return function (dispatch) {
    history.push(`/Search=${searchBoxValue}&listingType=${listingType}&sortBy=${sortBy}&maxResults=${maxResults}&ebayDataAfterOrBefore=${ebayDataAfterOrBefore}&listingEndTime=${listingEndTime}`);
  };
}

export function changeUserInputSortBy(value) {
  return function (dispatch) {
    dispatch({ type: "CHANGE_USERINPUT_SortBy", payload: value });
  };
}

export function changeUserInputebayDataAfterOrBefore(value) {
  return function (dispatch) {
    dispatch({ type: "CHANGE_USERINPUT_ebayDataAfterOrBefore", payload: value });
  };
}

export function changeUserInputlistingEndTime(value) {
  return function (dispatch) {
    dispatch({ type: "CHANGE_USERINPUT_listingEndTime", payload: value });
  };
}

export function changeUserInputNameOrFoodPairValue(value) {
  return function (dispatch) {
    dispatch({ type: "CHANGE_USERINPUT_NameOrFoodPairValue", payload: value });
  };
}

export function changeUserInputSearchBoxValue(value) {
  return function (dispatch) {
    dispatch({ type: "CHANGE_USERINPUT_SearchBoxValue", payload: value });
  };
}

export function changeUserInputMaxResults(value) {
  return function (dispatch) {
    dispatch({ type: "CHANGE_USERINPUT_MaxResults", payload: value });
  };
}

export function changeUserInfoId(value) {
  return function (dispatch) {
    dispatch({ type: "CHANGE_USERINFO_ID", payload: value });
  };
}

export function changeUserInfoUsername(value) {
  return function (dispatch) {
    dispatch({ type: "CHANGE_USERINFO_USERNAME", payload: value });
  };
}

export function changeUserInfoEmail(value) {
  return function (dispatch) {
    dispatch({ type: "CHANGE_USERINFO_EMAIL", payload: value });
  };
}

export function playAuthFailedAnimation(ele, animation) {
  return function () {
    ele.classList.add(animation);
    setTimeout(() => {
      ele.classList.remove(animation);
    }, 1000);
  };
}

export function changeShouldFetch(value) {
  return function (dispatch) {
    dispatch({ type: "CHANGE_ShouldFetch", payload: value });
  };
}

export function changeComingFromInput(value) {
  return function (dispatch) {
    dispatch({ type: "CHANGE_ComingFromInput", payload: value });
  };
}

export function updateMenu() {
  return function (dispatch) {
    dispatch({ type: "UPDATE_MENU", payload: null });
  };
}

export function updateResults() {
  return function (dispatch) {
    dispatch({ type: "UPDATE_RESULTS", payload: null });
  };
}

export function reloadWebsite() {
  return function (dispatch) {
    dispatch({ type: "RESET_THE_SEARCH_DATA", payload: null });
  };
}

export function emptyFavDataFromDB() {
  return function (dispatch) {
    dispatch({ type: "EMPTY_FAV_DATA_FROM_DB", payload: null });
  };
}

export function updateSideBarState(value) {
  return function (dispatch) {
    dispatch({ type: "UPDATE_SIDEBAR_STATE", payload: value });
  };
}

export function updateItemInfoModal(itemInfoForModal, showItemInfoModal) {
  return function (dispatch) {
    dispatch({
      type: "ZOOM_IMAGE",
      payload: {
        itemInfoForModal,
        showItemInfoModal,
      },
    });
  };
}
