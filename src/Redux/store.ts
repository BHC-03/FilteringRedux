import { applyMiddleware, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import moviesSlice from "./slices/movies";
import filteredMoviesSlice from "./slices/filteredMovies";
import { useDispatch,useSelector,TypedUseSelectorHook  } from "react-redux";
import logger from 'redux-logger'
const store = configureStore({
    reducer:{
        movies: moviesSlice,
        filteredMovies : filteredMoviesSlice
    },
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(logger)
    
})

export type appDisptach = typeof store.dispatch;
export const useAppDispatch:()=> appDisptach = useDispatch;
export type RootReducerType = ReturnType<typeof store.getState>
export const useAppSelector:TypedUseSelectorHook<RootReducerType> = useSelector;
export default store