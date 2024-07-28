// src/components.MovieCard.jsx
import React from "react";

const MovieCard = ({movie, onAddToWatchlist, onDeleteFromWatchlist, onToggleWatched})=>{
    return(
        <>
        <div className="bg-white p-4 shadow rounded-md flex flex-col">
            <img src={movie.Poster || movie.poster} alt={movie.Title || movie.title}></img>
            <h2 className="text-xl mt-2 font-semibold h-16 overflow-hidden text-ellipsis"> {movie.Title || movie.title}</h2>
            <p className="text-gray-600">{movie.Year || movie.year}</p>
            {onAddToWatchlist && (
                <button 
                    className="bg-green-500 text-white p-2 mt-auto rounded hover:bg-green-700"
                    onClick={()=> onAddToWatchlist(movie)}>Add to Watchlist
                </button>
            )}
            {onDeleteFromWatchlist && (
                <button 
                className="bg-red-500 text-white p-2 mt-auto rounded hover:bg-red-700"
                onClick={()=> onDeleteFromWatchlist(movie._id)}>Remove from Watchlist
            </button>
            )}
            {onToggleWatched && (
                <button 
                className="bg-yellow-500 text-white p-2 mt-2 w-full rounded hover:bg-yellow-700"
                onClick={()=> onToggleWatched(movie._id)}>{movie.watched ? 'Mark as Unwatched' : 'Mark as Watched'}
            </button>
            )}
        </div>
        </>
    )
}

export default MovieCard