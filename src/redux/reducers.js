const initialState = {
    electricians: [],
    complaints: []
  };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_ELECTRICIANS':
        return { ...state, electricians: action.payload };
      case 'FETCH_COMPLAINTS':
        return { ...state, complaints: action.payload };
      default:
        return state;
    }
  };

  export default reducer;