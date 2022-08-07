import { createSlice ,createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import { RootReducerType } from "../store";
import axios from 'axios';


export interface IMovie {
    title:string,
    genres: {name:string,uuid:string}[],
    year:number,
    image:string,
    countries:{name:string,uuid:string}[],
    description:string,
    id:string
}
interface initialStateI{
    status: 'idle' | 'completed' | 'error' | 'pending',
    movies :IMovie[],
    error?:unknown
}
export const fetchingThunk  = createAsyncThunk('movies/Fetching',async()=>{
    const options = {
        method:'GET',
        headers:{
            'X-RapidAPI-Key': 'f3e6b71aebmsh87c86148e237962p1a176ejsne209d79de834',
            'X-RapidAPI-Host': 'movie_list.p.rapidapi.com'
        },
        url:`https://movie_list.p.rapidapi.com/list`,

    };
    
        const data = await (await axios.request(options)).data;
        if(data){
            
            const result:IMovie[] = data.map((resault:{id:number,name:string,image:string,})=>{
                const array:string[] = resault.name.match(/\(([^)]+)\)/g)!;
                let year:number;
                if(array){
                    if (array.length! > 1){
                    let hello = array.filter(element=>{
                        if(element.length >=6) return element
                    })
                    if(hello[0]){
                        year = parseInt(hello[0].replace(/[\(\)]/g,'')!);
                    }else{
                        year=2022
                    }
                    
                }else{
                    year = parseInt(array[0].replace(/[\( \)]/g,''));
                }}else{
                    year = 2022
                }
                return {
                    year:year ,
                    title:resault.name,
                    image:resault.image,
                    id:resault.id
                }
               
            })
            const resulting:IMovie[] = result.slice(0,40);
            return resulting;
        }
        return [];
    
})
const initialState:initialStateI = {
    movies: [] ,
    status:'idle',
};
const movieSlice = createSlice({
    name:'movies',
    initialState,
    reducers:{

    },
    extraReducers(builder){
        builder.addCase(fetchingThunk.fulfilled,(state,action:PayloadAction<IMovie[]>)=>{
            state.status = 'completed';
            state.movies = [...action.payload];
        })
        builder.addCase(fetchingThunk.pending,(state)=>{
             state.status = 'pending';
        })
        builder.addCase(fetchingThunk.rejected,(state,action)=>{
            state.error = action.error.message;
        })
    }
})

export const postsSelector = (state:RootReducerType)=> state.movies.movies;



export default movieSlice.reducer;