import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './userSlice';
import PostsReducer from './postsSlice';

export const store = configureStore({
    reducer: {
        user: UserReducer,
        posts: PostsReducer
    }
})