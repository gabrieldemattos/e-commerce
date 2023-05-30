import ZipCodeActionTypes from "./action-types";

export const addZipCode = (payload) => ({
  type: ZipCodeActionTypes.ADD_ZIPCODE,
  payload,
});
