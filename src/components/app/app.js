import { Flex, Input, Pagination } from 'antd';
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
    page: null,
    totalPages: null,
  };
  getMovies = (name = 'The', page = 1) => {
    const movie = new MovieService();
    movie.getMovies(name, page).then((res) =>
      this.setState({
        movies: res.results,
        name,
        page: res.page,
        totalPages: res.total_pages,
      })
    );
  };
  render() {
    return (
      <section className="page">
        <Input placeholder="Type to search..." className="input" />
        <Flex wrap="wrap" gap={33} justify="space-between" className="card-list">
          {this.state.movies.map((i) => {
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
        <Pagination
          className="pagination"
          defaultCurrent={this.state.page}
          total={this.state.totalPages}
          showSizeChanger={false}
          onChange={(page) => {
            this.getMovies(this.state.name, page);
          }}
        />
      </section>
    );
  }
}
