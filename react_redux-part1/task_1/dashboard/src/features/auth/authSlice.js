import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    email: '',
    password: '',
  },
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => ({
      user: {
        email: action.payload.email,
        password: action.payload.password,
      },
      isLoggedIn: true,
    }),
    logout: () => ({
      user: {
        email: '',
        password: '',
      },
      isLoggedIn: false,
    }),
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
