// src/App.jsx
import React, { useEffect, useState } from 'react';
import axios from "./api/axios";

import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';


function App() {

  const [movies, setMovies] = useState([]);
  const [watchlist,setWatchlist] = useState([]);

  useEffect(()=>{
    fetchWatchList();
  },[]);


  const searchMovies = async (query) =>{
    const apikey = import.meta.env.VITE_OMDB_API_KEY;
    const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${apikey}`)
    const data = await response.json();

    if(data.Search){
      setMovies(data.Search);
    }
  }

  const fetchWatchList = async()=>{
    try{
      const response = await axios.get('/watchlist');
      setWatchlist(response.data);
    }catch(err){
      console.error("Error fetching watchlist from server:",err);
    }
  }

  const addMovieToWatchlist = async(movie) =>{
    try{
      const newMovie = {
        title:movie.Title,
        imdbID:movie.imdbID,
        poster:movie.Poster,
        year:movie.Year,
        type:movie.Type,
        watched:false,
      };

      await axios.post('/watchlist',newMovie);
      await fetchWatchList(); //Refresh watchlist after adding a movie
      alert(`${movie.Title} added to watchlist!`);
    }catch(err){
      console.error('Error adding movie to watchlist:',err);
    }
  }

  const deleteMovieFromWatchlist = async (id)=>{
    try{
      await axios.delete(`/watchlist/${id}`);
      fetchWatchList();
      alert('Movie removed from watchlist!');
    }catch(err){
      console.error('Error removing movie from watchlist:',err);
    }
  }

  const toggleWatchedStatus = async(id)=>{
    try{
      await axios.patch(`/watchlist/${id}/toggle-watched`);
      fetchWatchList();
    }catch(err){
      console.error('Error toggling watched status:',err);
    }
  }

  return (
    <>
     <div className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-blue-500 p-4">Movie Watchlist</h1>
      <SearchBar onSearch={searchMovies} onAddToWatchlist={addMovieToWatchlist} />
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} onAddToWatchlist={addMovieToWatchlist}></MovieCard>
          ))}
        </div>
        <h2 className="text-2xl font-bold text-center text-blue-500 p-4">My Watchlist</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {watchlist.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} onDeleteFromWatchlist={deleteMovieFromWatchlist} onToggleWatched={toggleWatchedStatus}></MovieCard>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
