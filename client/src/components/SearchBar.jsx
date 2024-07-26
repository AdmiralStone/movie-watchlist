// src/components/SearchBar.jsx

import React, {useState} from 'react';

function SearchBar({onSearch}){
    const [query,setQuery] = useState('');

    const handleSearch = (e)=>{
        e.preventDefault();
        onSearch(query);
    };
    return (
        <>
    
    <div className="flex justify-center items-center p-4">
      <form onSubmit={handleSearch} className="flex items-center w-full max-w-md">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
        >
          Search
        </button>
      </form>
    </div>
        
            
    
        </>
    )
};



export default SearchBar;