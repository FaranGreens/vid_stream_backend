const express = require("express");

const movierouter = express.Router();

const { addmovie, getMovies } = require("../controllers/movie.controller");

const authMiddleware = require('../middlewares/authmiddleware');

movierouter.get("/", async (req, res) => {
  let { page = 1, pageSize = 10, q = "" } = req.query;

  try {
    const data = await getMovies({ q, page, pageSize });

    res.status(200).send({
      data,
    });
  } catch (error) {
    console.log(error)
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

movierouter.post("/watchlist", (req, res) => {
  res.send("post watchlist");
});

movierouter.get("/watchlist", (req, res) => {
  res.send("get watchlist");
});

movierouter.delete("/watchlist", (req, res) => {
  res.send("remove watchlist");
});

module.exports = movierouter;
