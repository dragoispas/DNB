// store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import transactionReducer from './reducers/transactionReducer';
import usersReducer from './reducers/usersReducer';
import profileReducer from './reducers/profileReducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        users: usersReducer,
        profile: profileReducer,
        transactions: transactionReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
