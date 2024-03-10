import { Flex } from 'antd';
import React, { Component } from 'react';

import CardItem from '../cardItem/cardItem';
import MovieService from '../services/movie-service';

export default class App extends Component {
  constructor() {
    super();
    this.getMovies();
  }
  state = {
    movies: [],
  };
  getMovies = () => {
    const movie = new MovieService();
    movie.getMovies().then((res) =>
      this.setState({
        movies: res.results,
      })
    );
  };
  render() {
    return (
      <section className="page">
        <Flex wrap="wrap" gap={33} justify="space-between" className="card-list">
          {this.state.movies.map((i) => {
            console.log(i);
            return (
              <CardItem
                image={i.poster_path}
                key={i.id}
                title={i.title}
                score={i.vote_average.toFixed(1)}
                date={i.release_date}
                desc={i.overview}
              />
            );
          })}
        </Flex>
      </section>
    );
  }
}
