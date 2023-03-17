const express = require("express");

const movierouter = express.Router();

const {
  addmovie,
  getMovies,
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
} = require("../controllers/movie.controller");

const authMiddleware = require("../middlewares/authmiddleware");

movierouter.get("/", async (req, res) => {
  let { page = 1, pageSize = 10, q = "" } = req.query;

  try {
    const data = await getMovies({ q, page, pageSize });

    res.status(200).send({
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

movierouter.post("/add", async (req, res) => {
  let {
    backdrop_path,
    original_title,
    popularity,
    poster_path,
    release_date,
    title,
    video,
    vote_average,
  } = req.body;

  try {
    let data = await addmovie({
      backdrop_path,
      original_title,
      popularity,
      poster_path,
      release_date,
      title,
      video,
      vote_average,
    });
    res.status(201).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

movierouter.post("/watchlist", authMiddleware, async (req, res) => {
  let { _id } = req.loggedInUser;
  let movieID = req.body._id;
  //   console.log(_id);
  //   console.log(movieID);

  try {
    let response = await addToWatchlist(_id, movieID);
    console.log(response);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
  }
});

movierouter.get("/watchlist", authMiddleware, async (req, res) => {
  let { _id } = req.loggedInUser;
  //   console.log(_id);
  //   console.log(movieID);

  try {
    let response = await getWatchlist(_id);
    console.log(response);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
  }
});

movierouter.delete("/watchlist", authMiddleware, async (req, res) => {
  let { _id } = req.loggedInUser;
  let movieID = req.body._id;
  //   console.log(_id);
  //   console.log(movieID);

  try {
    let response = await removeFromWatchlist(_id, movieID);
    console.log(response);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
  }
});

module.exports = movierouter;
