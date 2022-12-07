import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import counter1Reducer from './slices/counter1Slice'
import counter2Reducer from './slices/counter2Slice'
/** set reducer */
const reducer = {
    counter1Reducer,
    counter2Reducer,
}

export const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV === 'development'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
/** for call to use dispatch */
export const useAppDispatch = () => useDispatch<AppDispatch>()