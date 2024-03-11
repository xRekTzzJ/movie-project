import { LoadingOutlined } from '@ant-design/icons';
import { Input, Pagination, Spin } from 'antd';
import React, { Component } from 'react';

import CardList from '../cardList';
import Header from '../header';
import MovieService from '../services/movie-service';
export default class App extends Component {
  componentDidMount() {
    this.getMovies('The');
  }
  state = {
    movies: [],
    page: null,
    totalPages: null,
    name: null,
    isRatedList: false,
    loading: true,
  };

  getMovies = (name, page = 1) => {
    this.setState({
      loading: true,
    });
    this.movie.getMovies(name, page).then((res) =>
      this.setState({
        movies: res.results,
        name,
        page: res.page,
        totalPages: res.total_pages,
        isRatedList: false,
        loading: false,
      })
    );
  };
  getRatedMovies = (page = 1) => {
    this.setState({
      loading: true,
    });
    this.movie.getTrendMovies(page).then((res) =>
      this.setState({
        movies: res.results,
        name: null,
        page: res.page,
        totalPages: res.total_pages,
        isRatedList: true,
        loading: false,
      })
    );
  };
  onHeaderButtonClick = (e) => {
    e.key === '1' ? this.getMovies('The') : this.getRatedMovies();
  };
  movie = new MovieService();
  render() {
    const { movies, page, totalPages, isRatedList, name, loading } = this.state;
    return (
      <section className="page">
        <Header onHeaderButtonClick={this.onHeaderButtonClick} />
        <Input placeholder="Type to search..." className="input" />
        {loading ? (
          <Spin
            size="large"
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: 50,
                }}
                spin
              />
            }
          />
        ) : null}
        {!loading ? <CardList movies={movies} /> : null}
        <Pagination
          className="pagination"
          defaultCurrent={page}
          current={page}
          total={totalPages}
          showSizeChanger={false}
          onChange={(page) => {
            isRatedList ? this.getRatedMovies(page) : this.getMovies(name, page);
          }}
        />
      </section>
    );
  }
}
