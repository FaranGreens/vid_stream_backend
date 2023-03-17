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
  console.log(q, page, pageSize);
  let movies = await Movie.find({ title: { $regex: `${q}`, $options: "i" } })
    .limit(pageSize)
    .skip(skip);
  console.log(movies);
  return {
    movies,
  };
}

async function addToWatchlist(_id, movieID) {
  // console.log(_id, movieID);
  let movie = await Movie.findById(movieID);
  console.log(movie._id);
  let user = await User.findById(_id);
  await User.findByIdAndUpdate(_id, {
    watchlist: [...user.watchlist, movie._id],
  });
  let updatedUser = await User.findById(_id);

  return updatedUser;
}

async function getWatchlist(_id){
    let user = await User.findById(_id);

    return user.watchlist;

}

async function removeFromWatchlist(_id, movieID){
    let user = await User.findById(_id);

    let new_watchlist = user.watchlist.filter(e=>{
        return e.valueOf() != movieID.valueOf()
    });
    let updateduser = await User.findByIdAndUpdate(_id,{
        watchlist: new_watchlist
    }, {
        new:true
    })
    // console.log("new watchlist is ",new_watchlist);
    console.log("user is ",updateduser);
    // console.log("movie is", movie)

    return new_watchlist;
}


module.exports = {
  addmovie,
  getMovies,
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
};
