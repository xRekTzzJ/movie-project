import { LoadingOutlined } from '@ant-design/icons';
import { Alert, Input, Pagination, Spin } from 'antd';
import React, { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';

import CardList from '../cardList';
import Header from '../header';
import MovieService from '../services/movie-service';
export default class App extends Component {
  componentDidMount() {
    this.getRatedMovies();
  }
  state = {
    movies: [],
    page: null,
    totalPages: null,
    isRatedList: true,
    loading: true,
    error: false,
    offline: false,
    inputValue: '',
  };

  getMovies = (inputValue, page = 1) => {
    this.setState({
      loading: true,
    });
    this.movie
      .getMovies(inputValue, page)
      .then((res) =>
        this.setState({
          movies: res.results,
          inputValue,
          page: res.page,
          totalPages: res.total_pages,
          isRatedList: false,
          loading: false,
          error: false,
          Offline: false,
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
          inputValue: '',
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
    e.key === '1' ? this.getMovies() : this.getRatedMovies();
  };
  onInputEnter = (e) => {
    this.getMovies(e.target.value);
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
  renderCardList = (loading, error, movies, isRatedList, inputValue) => {
    return !loading && !error ? <CardList movies={movies} isRatedList={isRatedList} inputValue={inputValue} /> : null;
  };
  onClickPagination = (page, isRatedList, inputValue) => {
    isRatedList ? this.getRatedMovies(page) : this.getMovies(inputValue, page);
  };
  lostConnectionHandler = () => {
    this.setState(({ offline }) => {
      return {
        offline: !offline,
      };
    });
  };
  movie = new MovieService();
  render() {
    const { movies, page, totalPages, isRatedList, inputValue, loading, error, offline } = this.state;
    return (
      <section className="page">
        <Header isRatedList={isRatedList} onHeaderButtonClick={this.onHeaderButtonClick} />
        <Input onPressEnter={this.onInputEnter} placeholder="Type to search..." className="input" />
        {this.renderSpinner(loading)}
        {this.renderErrorAlert(error)}
        <Online>{this.renderCardList(loading, error, movies, isRatedList, inputValue)}</Online>
        <Offline onChange={this.lostConnectionHandler}>
          <Alert
            message="The connection is lost."
            description="Please check your connection and try again."
            type="error"
            showIcon
          />
        </Offline>
        <Pagination
          className="pagination"
          defaultCurrent={page}
          current={page}
          total={totalPages}
          showSizeChanger={false}
          disabled={error || offline ? true : false}
          onChange={(pageNumber) => {
            this.onClickPagination(pageNumber, isRatedList, inputValue);
          }}
        />
      </section>
    );
  }
}
