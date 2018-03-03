export function fetchEbayApiDataFromBackend(searchBoxValue, nameOrFoodPairOption, maxResults, brewedAfterOrBefore, brewedDate, sortBy) {
  if (sortBy === "Price + Shipping: highest first") {
    sortBy = "PricePlusShippingHighest";
  } else if (sortBy === "Price + Shipping: lowest first") {
    sortBy = "PricePlusShippingLowest";
  }
  return function (dispatch) {
    fetch('/ebayApi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({
        search: searchBoxValue,
        maxResults: maxResults,
        listingType: nameOrFoodPairOption,
        sortBy: sortBy,
      }),
    })
      .then(res => res.json())
      .then((responseJson) => {
        if (responseJson["@count"] == 0) {
          dispatch({ type: "FETCH_EBAYAPI_REJECTED", payload: null });
        } else {
          dispatch({
            type: "FETCH_EBAYAPI_FULFILLED",
            payload: {
              brewDogApiData: responseJson.item,
            },
          });
        }
      })
      .catch(err => {
        dispatch({ type: "FETCH_EBAYAPI_REJECTED", payload: err });
      });
  };
}