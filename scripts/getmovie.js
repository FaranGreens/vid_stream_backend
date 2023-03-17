const connectDB = require('../config/connectDB');

const Movie = require('../models/Movie.model');
console.log(Movie);
fetch(
  `https://api.themoviedb.org/3/movie/popular?api_key=ed9752e73a9c3448abd38b33a4340499&language=hn-US&page=1`
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data.results.length);
    connectDB().then(Movie.save(data.results))
    
  });
