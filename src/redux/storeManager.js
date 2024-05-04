import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { JobSearch } from './JobSearch';

const rootReducer = combineReducers({
    jobSearch: JobSearch
})

export const StoreManager = () => {
    const store = configureStore({
        reducer: rootReducer
    })

    return store
}