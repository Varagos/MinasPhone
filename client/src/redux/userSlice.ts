import { Product } from '@chec/commerce.js/types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserPayload = Record<string, string>;
export interface IUserState {
  data?: UserPayload;
  status: 'idle' | 'loading' | 'signedIn' | 'signedOut' | 'failed';
  error: string;
}

const initialState: IUserState = {
  data: undefined,
  status: 'idle',
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userFetched: (state, action: PayloadAction<UserPayload>) => {
      state.data = action.payload;
    },
    userSignedOut: (state) => {
      // console.log('reducer runnnnnnnnn');
      state.status = 'signedOut';
    },
    userSignedIn: (state) => {
      // console.log('reducer runnnnnnnnn');
      state.status = 'signedIn';
    },
  },
});

// Action creators are generated for each case reducer function
export const { userFetched, userSignedOut, userSignedIn } = userSlice.actions;

export default userSlice.reducer;
