// src/App.jsx
import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import axios from "./api/axios";

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
    <div className='min-h-screen bg-gray-100'>
      <h1 className='text-3xl font bold text-center text-blue-500 p-4 bg-slate-200'> Movie Watchlist</h1>
      <SearchBar onSearch={searchMovies}></SearchBar>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p4 mb-5'>
        {movies.map((movie) =>(
          <div key={movie.imdbID} className='bg-white p-4 shadow'>
            <img src={movie.Poster} alt={movie.Title} className='w-full h-80'/>
            <h2 className='text-xl mt-2 text-center'>{movie.Title}</h2>
            <p className='text-center'>{movie.Year}</p>
            <button 
              className='bg-green-500 text-white p-2 mt-2 ml-20 rounded-xl hover:bg-green-900'
              onClick={()=>addMovieToWatchlist(movie)}>Add to Watchlist</button>
          </div>

        ))}
      </div>
      <h2 className="text-2xl font-bold text-center text-blue-500 p-4">Watchlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {watchlist.map((movie) => (
          <div key={movie.imdbID} className="bg-white p-4 shadow">
            <img src={movie.poster} alt={movie.title} className="w-full h-auto" />
            <h2 className="text-xl mt-2 text-center">{movie.title}</h2>
            <p className='text-center'>{movie.year}</p>
            <p className='text-center'>{movie.genre}</p>
            <button 
              className='bg-red-500 text-white p-2 m-2 rounded-lg'
              onClick={()=>{deleteMovieFromWatchlist(movie._id)}}>Remove</button>
              <button
              className="bg-yellow-500 text-white p-2 m-2 rounded-lg"
              onClick={() => toggleWatchedStatus(movie._id)}
            >
              {movie.watched ? 'Mark as Unwatched' : 'Mark as Watched'}
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default App;
