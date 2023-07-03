import { createSlice } from '@reduxjs/toolkit';
import { UserData } from '../../services/auth';

import { RootState } from '../store';
// import actions from '../actions';

export interface IAuthState {
  userData: UserData | undefined;
  isAuthenticated: 'pending' | boolean;
}

const initialState: IAuthState = {
  userData: undefined,
  isAuthenticated: 'pending',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authChanged(state: IAuthState, action) {
      const userData = action.payload || undefined;
      if (userData) {
        // // console.log('userData in authChanged', userData);
        return { ...state, userData, isAuthenticated: true };
      } else {
        return { ...state, userData: undefined, isAuthenticated: false };
      }
    },
    clearedAuth(state: IAuthState) {
      return { ...state, userData: undefined, isAuthenticated: false };
    },
  },
});

export const { authChanged, clearedAuth } = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUserData = (state: RootState): UserData | undefined => {
  const { userData } = state.auth;
  return userData;
};

export const selectIsAuthenticated = (state: RootState): boolean | 'pending' => {
  const { isAuthenticated } = state.auth;
  return isAuthenticated;
};

export default authSlice.reducer;
