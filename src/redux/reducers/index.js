import { createReducer } from "reduxsauce";

export const initialState = {
  profile: null,
  uid: "",
  brand: {},
  users: [],
  firstname:"",
  retailers:[],
  totalsaving:0
};

const saveProfileReducer = (state, action) => ({
  ...state,
  profile: action.profile
});
const saveUIDReducer = (state, action) => ({
  ...state,
  uid: action.uid
});
const saveTotalSavingReducer = (state,action)=>({
  ...state,
  totalsaving:action.totalsaving
})
const saveBrandReducer = (state, action) => ({
  ...state,
  brand: action.brand
});
const saveFirstnameReducer = (state, action) => ({
  ...state,
  firstname: action.firstname
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
  users: [],
  firstname:null,
  totalsaving:0
});
const actionHandlers = {
  SAVE_PROFILE: saveProfileReducer,
  SAVE_FIRSTNAME: saveFirstnameReducer,
  SAVE_RETAILERS: saveRetailersReducer,
  SAVE_UID: saveUIDReducer,
  SAVE_BRAND: saveBrandReducer,
  SAVE_USERS: saveUsersReducer,
  SAVE_TOTALSAVING: saveTotalSavingReducer,
  REMOVE: removeAllReducer
};
export default createReducer(initialState, actionHandlers);
