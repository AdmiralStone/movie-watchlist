# Movie Watchlist

This project is a Movie Watchlist web application built to help users search for movies and add them to a personal watchlist. It utilizes the OMDB API for movie data and features a React frontend, a Node.js backend, and a MongoDB database.

## Features

- **Search Movies:** Search for movies by title and view details fetched from the OMDB API.
- **Add to Watchlist:** Add movies to your watchlist from the search results.
- **View Watchlist:** View all movies in your watchlist in a card view with posters and basic information.
- **Remove from Watchlist:** Remove movies from your watchlist.
- **Mark as Watched:** Mark movies as watched or unwatched.

## Technologies Used

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **API:** OMDB API

## Installation and Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/AdmiralStone/movie-watchlist.git
   cd movie-watchlist
   ```
2. **Backend Setup:**
    - Navigate to the `server` directory and install dependencies:
        ```sh
        cd server
        npm install
        ```
    - Create a `.env` file and add your MongoDB URI:
        ```sh
        MONGODB_URI=your_mongodb_uri
        PORT=5002
        ```
    - Start the backend server:
        ```
        npm start
        ```
3. **Frontend setup:**
    - Navigate to the `client` directory and install dependencies:
        ```sh
        cd ../client
        npm install
        ```
    - Create `.env` file and add your OMDB API key:
        ```
        VITE_OMDB_API_KEY=your_omdb_api_key
        ```
    - Start the frontend development server:
        ```
        npm run dev
        ```
4. **Access the Application:**
    - Open your browser and go to `http://localhost:5172`.