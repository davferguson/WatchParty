import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/user/userSlice'
import groupReducer from '../features/firestore/groupSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    group: groupReducer,
  },
});
