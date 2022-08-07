import React ,{useEffect}from 'react';
import { IMovie, postsSelector } from '../../Redux/slices/movies';
import { useAppDispatch } from '../../Redux/store';
import { fetchingThunk } from '../../Redux/slices/movies';
import SingleMovie from '../singleMovie/SignleMovie';
import { AddMovies } from '../../Redux/slices/filteredMovies';
import { useAppSelector } from '../../Redux/store';
import './styling/Movies.css';


const Movies:React.FC = ()=>{
    const dispatch = useAppDispatch()
    const moviestate = useAppSelector(state=>state.movies.status)
    const filtered = useAppSelector(state=> state.filteredMovies)
    const AddMoviesHandler = ()=>{
       dispatch(AddMovies());
    }
    useEffect(()=>{
        if(filtered.movies.length === 0){
            if(moviestate === 'completed'){
                AddMoviesHandler();
            }
        }
    },[moviestate])
    useEffect(()=>{
        dispatch(fetchingThunk());
    },[])
    return(
        <div className='moviesListContainer'>
                <div className="movieList">
                    {
                        filtered.movies.map(movie=>{
                           return <SingleMovie  movie={movie} key={movie.id}/>
                        })
                    }
                    {
                        moviestate === 'pending' ? <div>loading .... </div>:''
                    }
                </div>
                <button className='button' onClick={()=>AddMoviesHandler()}>MORE</button>
        </div>
    )
}


export default Movies;