// src/components/SearchBar.jsx

import React, {useState} from 'react';

function SearchBar({onSearch}){
    const [query,setQuery] = useState('');

    const handleSearch = ()=>{
        onSearch(query);
    };
    return (
        <>
    
        <div className='flex items-center justify-center p-4'>
            <input 
                type='text'
                className='border p-2 mr-2 rounded-lg'
                placeholder='Search for a movie'
                value={query}
                onChange={(e) => setQuery(e.target.value)}/>
            <button
            className='bg-blue-500 text-white p-2 rounded-md'
            onClick={handleSearch}>
                Search
            </button>
        </div>
        
            
    
        </>
    )
};



export default SearchBar;