export default function reducer(
  state = {
    brewDogApiData: [],
    shouldFetch: true,
    fetched: false,
    userInput: { nameOrFoodPairOption: "FixedPrice", searchBoxValue: "", sortBy: "BestMatch", maxResults: 25, brewedDate: null, brewedAfterOrBefore: "brewed_before" },
    error: null,
    comingFromInput: false,
    updateMenu: 0,
    updateResults: 0,
    itemInfoForModal: null,
    showItemInfoModal: false,
    isSideBarOpen: false,
    userInfo: { id: null, username: null, email: null },
    userInfoFetched: false,
    favDataFromDB: {},
    hasFetchedFavDataFromDB: false,
  },
  action
) {
  switch (action.type) {
    case "FETCH_API_FULFILLED": {
      return { ...state, apiHasFetched: action.payload };
    }

    default:
      return state;
  }
}
