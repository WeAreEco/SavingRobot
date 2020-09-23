import { createReducer } from "reduxsauce";

export const initialState = {
  profile: null,
  uid: "",
  brand: {},
  users: [],
  retailers:[]
};

const saveProfileReducer = (state, action) => ({
  ...state,
  profile: action.profile
});
const saveUIDReducer = (state, action) => ({
  ...state,
  uid: action.uid
});
const saveBrandReducer = (state, action) => ({
  ...state,
  brand: action.brand
});
const saveRetailersReducer = (state, action) => ({
  ...state,
  retailers: action.retailers
});
const saveUsersReducer = (state, action) => ({
  ...state,
  users: action.users
});
const removeAllReducer = (state, action) => ({
  ...state,
  profile: null,
  brand: null,
  uid: null,
  posts: null,
  users: []
});
const actionHandlers = {
  SAVE_PROFILE: saveProfileReducer,
  SAVE_RETAILERS: saveRetailersReducer,
  SAVE_UID: saveUIDReducer,
  SAVE_BRAND: saveBrandReducer,
  SAVE_USERS: saveUsersReducer,
  REMOVE: removeAllReducer
};
export default createReducer(initialState, actionHandlers);
