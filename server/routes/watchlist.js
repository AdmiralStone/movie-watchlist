// server/routes/watchlist.js

import express, { Router } from 'express';
import Watchlist from '../models/Watchlist.js';

const router = express.Router();

// Add a movie to watchlist
router.post('/',async(req,res) =>{
    try{
        const newMovie = new Watchlist(req.body);
        await newMovie.save();
        res.status(201).json({movie:newMovie , message:"Movie Added to watchlist"});
    }catch(err){
        res.status(500).json({message:err.message});
    }
});


// Get all movies in the watchlist
router.get('/',async(req,res) =>{
    try{
        const movies = await Watchlist.find();
        res.json(movies);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

// Remove movie from watchlist
router.delete("/:id", async(req,res) =>{
    try{
        const result = await Watchlist.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json({message:"Move removed from watchlist"});
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

// Toggle watched status of a movie
router.patch("/:id/toggle-watched" , async(req,res) =>{
    try{
        const movie = await Watchlist.findById(req.params.id);
        if(!movie)return res.status(404).json({message:"Movie not found"});

        movie.watched = !movie.watched;
        // movie.watchDate = new Date().toLocaleDateString();

        await movie.save();
        res.json(movie);

    }catch(err){
        res.status(500).json({message:err.message});
    }
})

export default router;

