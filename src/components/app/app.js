import { LoadingOutlined } from '@ant-design/icons';
import { Alert, Input, Pagination, Spin } from 'antd';
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
    error: false,
  };

  getMovies = (name, page = 1) => {
    this.setState({
      loading: true,
    });
    this.movie
      .getMovies(name, page)
      .then((res) =>
        this.setState({
          movies: res.results,
          name,
          page: res.page,
          totalPages: res.total_pages,
          isRatedList: false,
          loading: false,
          error: false,
        })
      )
      .catch(() =>
        this.setState({
          error: true,
          loading: false,
        })
      );
  };
  getRatedMovies = (page = 1) => {
    this.setState({
      loading: true,
    });
    this.movie
      .getRatedMovies(page)
      .then((res) =>
        this.setState({
          movies: res.results,
          name: null,
          page: res.page,
          totalPages: res.total_pages,
          isRatedList: true,
          loading: false,
          error: false,
        })
      )
      .catch(() =>
        this.setState({
          error: true,
          loading: false,
        })
      );
  };
  onHeaderButtonClick = (e) => {
    e.key === '1' ? this.getMovies('The') : this.getRatedMovies();
  };
  renderErrorAlert = (error) => {
    return error ? (
      <Alert showIcon type="error" description="The error is on the server side. Please try again later." />
    ) : null;
  };
  renderSpinner = (loading) => {
    return loading ? (
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
    ) : null;
  };
  renderCardList = (loading, error, movies) => {
    return !loading && !error ? <CardList movies={movies} /> : null;
  };
  onClickPagination = (page, isRatedList, name) => {
    isRatedList ? this.getRatedMovies(page) : this.getMovies(name, page);
  };
  movie = new MovieService();
  render() {
    const { movies, page, totalPages, isRatedList, name, loading, error } = this.state;
    return (
      <section className="page">
        <Header onHeaderButtonClick={this.onHeaderButtonClick} />
        <Input placeholder="Type to search..." className="input" />
        {this.renderSpinner(loading)}
        {this.renderErrorAlert(error)}
        {this.renderCardList(loading, error, movies)}
        <Pagination
          className="pagination"
          defaultCurrent={page}
          current={page}
          total={totalPages}
          showSizeChanger={false}
          disabled={error ? true : false}
          onChange={(pageNumber) => {
            this.onClickPagination(pageNumber, isRatedList, name);
          }}
        />
      </section>
    );
  }
}
