// server/models/Watchlist.js

import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema({
    title:{type:String, required:true},
    imdbID:{type:String,required:true,unique:true},
    poster:String,
    year:String,
    type:String,
    watched:{type:Boolean, default:false},
    watchDate:{type:Date,default:null}
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema);

export default Watchlist;