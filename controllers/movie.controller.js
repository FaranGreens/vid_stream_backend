const User = require("../models/User.model");
const Movie = require("../models/Movie.model");

async function addmovie({
  backdrop_path,
  original_title,
  popularity,
  poster_path,
  release_date,
  title,
  video,
  vote_average,
}) {
  const movie = await Movie.create({
    backdrop_path,
    original_title,
    popularity,
    poster_path,
    release_date,
    title,
    video,
    vote_average,
  });

  return movie;
}

async function getMovies({ q, page, pageSize }) {
  const skip = (page - 1) * pageSize;
  console.log(q, page, pageSize)
  let movies = await Movie.find({title:{$regex:`${q}` , $options:"i"}})
    .limit(pageSize)
    .skip(skip);
    console.log(movies)
    return {
        movies
    }
}

module.exports = {
  addmovie,
  getMovies,
};
