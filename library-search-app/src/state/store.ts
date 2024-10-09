import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import booksReducer from './books/booksSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    books: booksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;