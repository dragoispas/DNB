// store.ts
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users/reducer'
import profileReducer from './auth/reducer'
import transactionsReducer from './transactions/reducer'

const store = configureStore({
    reducer: {
        users: usersReducer,
        profile: profileReducer,
        transactions: transactionsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


//TODO

// How does redux scale in larger projects?

// How can I implement a good project structure in this case

// how can I utilize hooks to improve ease of use of my state