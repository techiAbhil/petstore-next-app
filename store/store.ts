import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './registrationSlice';

export const store = configureStore({
    reducer: {
        registration: registrationReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
