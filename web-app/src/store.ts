// store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import transactionReducer from './reducers/transactionReducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        transactions: transactionReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
