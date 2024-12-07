import { combineReducers } from 'redux';

import profileSlice from '../store/slices/profile.slice';

const rootSlice = combineReducers({
  profile: profileSlice
})

export default rootSlice;