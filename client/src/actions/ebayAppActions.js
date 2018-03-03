export function fetchApi(value, option) {
  return function (dispatch) {
    dispatch({
      type: "FETCH_API_FULFILLED",
      payload: {
        value,
        option,
      },
    });
  };
}
