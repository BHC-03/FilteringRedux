import React from "react";
import { IMovie } from "../../Redux/slices/movies";
import './styling/SingleMovie.css';

interface singleMovieProps{
    movie:IMovie
}
const SingleMovie:React.FC<singleMovieProps> = ({movie})=>{
    return (
        <div className="signleMovieContainer">
            <div className="movieImageContainer"><img className="movieImage" src={movie.image} alt={movie.title} /></div>
            <div className="movieInfo">
                <div className="movieTitle">{movie.title}</div>
                <div className="movieYear">{movie.year}</div>
            </div>
        </div>
    )
}

export default SingleMovie;