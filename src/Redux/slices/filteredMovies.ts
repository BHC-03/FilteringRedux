import { createSlice, PayloadAction ,createAsyncThunk } from "@reduxjs/toolkit";
import { fetchingThunk } from "./movies";
import { IMovie } from "./movies";
import { RootReducerType , appDisptach } from "../store";
const initialState:{
    movies: IMovie[],
    status:'loading' | 'finished',
    filtering?:{
        minYear?: number,
        maxYear?: number,
        Genres?:string[]
    }
} = {
    movies:[],
    status : 'finished'
}; 

export const AddMovies = createAsyncThunk<IMovie[],undefined,{state:RootReducerType , dispatch:appDisptach}>('addFilteredMovies',(_,thunkAPI)=>{
    const filtereState = thunkAPI.getState().filteredMovies;
    const moviesState = thunkAPI.getState().movies;
    const n:number = filtereState.movies.length;
    if(n === 40) return []
    if(filtereState.filtering){
        let coppy:IMovie[] = [];
             coppy  =  moviesState.movies.filter(movie=>{
                if(movie.year <= filtereState.filtering!.maxYear! && movie.year >= filtereState.filtering!.minYear!) return movie
            }) 
        return coppy.slice(n,n+10)
    }else{
        return moviesState.movies.slice(n,n+10);
    }
    
})



const filteredMovieSlice = createSlice({
    name:'filteredmovieslice',
    initialState,
    reducers:{
        
        clearMovies:(state)=>{
            state.movies = []
        },
        addFilters:(state,action:PayloadAction<{minYear:number,maxYear:number,genres:string[]}>)=>{
            state.filtering = {minYear:action.payload.minYear,maxYear:action.payload.maxYear,Genres:action.payload.genres}
        }
        
    },
    extraReducers:(builder)=>{
        builder.addCase(AddMovies.fulfilled,(state,action:PayloadAction<IMovie[]>)=>{
            state.movies = [...state.movies,...action.payload];
        })
    }
    
})

export const {clearMovies,addFilters} = filteredMovieSlice.actions;

export default filteredMovieSlice.reducer;