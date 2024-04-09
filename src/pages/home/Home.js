import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieList from '../../components/movieList/MovieList';

const Home = () => {
  const api_key = "cdf613d58b993b2cb425911da91ed77b";
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setPopularMovies(data.results));
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <>
      <Slider {...settings}>
        {popularMovies.map((movie) => (
          <Link
            key={movie.id}
            className="linkStyle"
            to={`/movie/${movie.id}`}
          >
            <div className="posterImage zoomContainer">
              <img
                alt="poster"
                src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`}
              />
            </div>
            <div className="posterImage__overlay">
              <div className="posterImage__title">
                {movie ? movie.original_title : ""}
              </div>
              <div className="posterImage__runtime">
                {movie ? movie.release_date : ""}
                <span className="posterImage__rating">
                  {movie ? (movie.vote_average.toFixed(1)) : ""}
                  <i className="fas fa-star" style={{paddingLeft:'5px', color:'#f5c611'}}/>{" "}
                </span>
              </div>
              <div className="posterImage__description">
                {movie ? movie.overview : ""}
              </div>
            </div>
          </Link>
        ))}
      </Slider>
      <MovieList />
    </>
  );
};

export default Home;
