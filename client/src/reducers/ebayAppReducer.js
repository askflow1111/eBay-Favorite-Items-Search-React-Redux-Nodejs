export default function reducer(
  state = {
    apiHasFetched: false,
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
