import ZipCodeActionTypes from "./action-types";

const initialState = {
  zipCode: "",
};

const zipCodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ZipCodeActionTypes.ADD_ZIPCODE:
      return { ...state, zipCode: action.payload };

    default:
      return state;
  }
};

export default zipCodeReducer;
